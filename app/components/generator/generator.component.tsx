'use client';

import {FormEvent, ReactElement, useEffect, useState} from 'react';

import {useSession} from 'next-auth/react';

import {Link} from '.prisma/client';

import Loading from '@/app/loading';

import ButtonComponent, {ButtonComponentVariant} from '@/app/components/button/button.component';
import LinkComponent from '@/app/components/link/link.component';

import styles from './generator.module.scss';

export default function GeneratorComponent(): ReactElement {
    const {status: authStatus} = useSession();

    const [links, setLinks] = useState<Link[]>([]);

    useEffect(() => {
        const fetchLinks = async (): Promise<void> => {
            const response = await fetch('/api/link/all');
            const data: Link[] = await response.json();

            setLinks(data);
        };

        fetchLinks().then();
    }, []);

    if (authStatus === 'loading') {
        return <Loading />;
    }

    if (authStatus === 'unauthenticated') {
        return <p>not logged in</p>;
    }

    const formSubmitHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const original = (e.currentTarget.elements.namedItem('link') as HTMLInputElement).value;

        const response = await fetch('/api/link/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({original}),
        });

        const result = await response.json();

        if (!result) {
            console.log('error');
        } else {
            console.log('ok');
        }
    };

    return (
        <div className={styles['generator-component']}>
            <form onSubmit={formSubmitHandler}>
                <input type="text" name="link" placeholder="Put your link here..." />
                <ButtonComponent variant={ButtonComponentVariant.PRIMARY} type="submit">
                    Generate
                </ButtonComponent>
            </form>

            <p className={styles['suggestion']}>
                <strong>But Wait!</strong> There is an even better option... Sign up and see the links that you have
                generated. You can even edit them or remove them entirely.{' '}
                <LinkComponent href="/auth">Sign up for FREE</LinkComponent>.
            </p>

            <ul>
                {links.map((link) => (
                    <li key={link.id}>
                        <div className={styles.alias}> {link.alias}</div>

                        <div className={styles.original}>
                            <LinkComponent href={link.original} isExternal={true}>
                                {link.original}
                            </LinkComponent>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

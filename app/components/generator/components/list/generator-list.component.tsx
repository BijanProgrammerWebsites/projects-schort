import {Dispatch, ReactElement, SetStateAction} from 'react';

import {Link} from '@prisma/client';

import {FaShareAlt, FaTrashAlt} from 'react-icons/fa';

import ButtonComponent, {ButtonComponentSize, ButtonComponentVariant} from '@/app/components/button/button.component';
import LinkComponent from '@/app/components/link/link.component';

import styles from './generator-list.module.scss';

export default function GeneratorListComponent({
    links,
    setLinks,
}: {
    links: Link[];
    setLinks: Dispatch<SetStateAction<Link[]>>;
}): ReactElement {
    const copyButtonClickHandler = async (link: Link): Promise<void> => {
        const content = `https://schort.ir/${link.alias}`;

        if ('clipboard' in navigator) {
            await navigator.clipboard.writeText(content);
        } else {
            document.execCommand('copy', true, content);
        }
    };

    const removeButtonClickHandler = async (link: Link): Promise<void> => {
        const response = await fetch('/api/link', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: link.id}),
        });

        if (!response.ok) {
            console.log('error', response);
        } else {
            const result = await response.json();

            if (!result) {
                console.log('error');
            } else {
                console.log('result', result);

                setLinks((previousValue) => previousValue.filter((x) => x.id !== link.id));
            }
        }
    };

    return (
        <ul className={styles['generator-list-component']}>
            {links.map((link) => (
                <li key={link.id}>
                    <div className={styles.alias}>{link.alias}</div>

                    <div className={styles.buttons}>
                        <ButtonComponent
                            title="Copy"
                            variant={ButtonComponentVariant.PRIMARY}
                            size={ButtonComponentSize.NORMAL}
                            onClick={(): Promise<void> => copyButtonClickHandler(link)}
                        >
                            <FaShareAlt />
                        </ButtonComponent>

                        <ButtonComponent
                            title="Remove"
                            variant={ButtonComponentVariant.DANGER}
                            size={ButtonComponentSize.NORMAL}
                            onClick={(): Promise<void> => removeButtonClickHandler(link)}
                        >
                            <FaTrashAlt />
                        </ButtonComponent>
                    </div>

                    <div className={styles.original}>
                        <LinkComponent href={link.original} isExternal={true}>
                            {link.original}
                        </LinkComponent>
                    </div>
                </li>
            ))}
        </ul>
    );
}

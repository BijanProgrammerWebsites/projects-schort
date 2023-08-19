'use client';

import {ReactElement} from 'react';

import {Acme} from 'next/font/google';
import {usePathname} from 'next/navigation';

import {signOut, useSession} from 'next-auth/react';

import {FaArrowRightFromBracket} from 'react-icons/fa6';

import Loading from '@/app/loading';

import ButtonComponent, {ButtonComponentSize, ButtonComponentVariant} from '@/app/components/button/button.component';
import LinkComponent, {LinkComponentSize, LinkComponentVariant} from '@/app/components/link/link.component';

import styles from './header.module.scss';

const acme = Acme({weight: '400', subsets: ['latin']});

export default function HeaderComponent(): ReactElement {
    return (
        <header className={'page-bleed ' + styles.header}>
            <LinkComponent
                href="/"
                variant={LinkComponentVariant.GHOST}
                size={LinkComponentSize.UNSET}
                fontClassName={acme.className}
            >
                Schort
            </LinkComponent>

            <div className={styles.auth}>
                <AuthComponent />
            </div>
        </header>
    );
}

function AuthComponent(): ReactElement {
    const {data: session, status: authStatus} = useSession();
    const pathname = usePathname();

    const logoutButtonClickHandler = async (): Promise<void> => {
        await signOut({redirect: false});
    };

    if (authStatus === 'loading') {
        return <Loading />;
    }

    if (authStatus === 'authenticated') {
        return (
            <>
                <div>Hello, {session?.user?.name}!</div>
                <ButtonComponent
                    variant={ButtonComponentVariant.BASIC}
                    size={ButtonComponentSize.NORMAL}
                    aria-label="Log Out"
                    onClick={logoutButtonClickHandler}
                >
                    <FaArrowRightFromBracket />
                    Log Out
                </ButtonComponent>
            </>
        );
    }

    if (pathname === '/auth') {
        return <LinkComponent href="/">Return to Home Page</LinkComponent>;
    }

    return (
        <LinkComponent href="/auth" variant={LinkComponentVariant.BUTTON} size={LinkComponentSize.UNSET}>
            Sign Up for FREE
        </LinkComponent>
    );
}

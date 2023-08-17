'use client';

import {ReactElement} from 'react';

import {Acme} from 'next/font/google';
import Link from 'next/link';

import {signOut, useSession} from 'next-auth/react';

import {FaArrowRightFromBracket} from 'react-icons/fa6';

import Loading from '@/app/loading';

import styles from './header.module.scss';

const acme = Acme({weight: '400', subsets: ['latin']});

export default function HeaderComponent(): ReactElement {
    return (
        <header className={'page-bleed ' + styles.header}>
            <Link href="/" className={`${styles.logo} + ${acme.className}`}>
                Schort
            </Link>

            <div className={styles.auth}>
                <AuthComponent />
            </div>
        </header>
    );
}

function AuthComponent(): ReactElement {
    const {data: session, status: authStatus} = useSession();

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
                <button className={styles['logout']} aria-label="Log Out" onClick={logoutButtonClickHandler}>
                    <FaArrowRightFromBracket />
                </button>
            </>
        );
    }

    return (
        <Link href="/auth" className={styles['call-to-action']}>
            Sign Up for FREE
        </Link>
    );
}

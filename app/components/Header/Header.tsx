'use client';

import {ReactElement} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

import styles from './Header.module.scss';

export default function Header(): ReactElement {
    const pathname = usePathname();

    return (
        <header className={'page-bleed ' + styles.header}>
            <nav>
                <Link href="/" className={styles.logo}>
                    Schort
                </Link>

                <ul>
                    <li>
                        <Link href="/" className={pathname === '/' ? styles.active : ''}>
                            Home
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

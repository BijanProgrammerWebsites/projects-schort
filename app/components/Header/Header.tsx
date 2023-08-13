'use client';

import {ReactElement} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

import styles from './Header.module.scss';
import {FaArrowUpRightFromSquare} from 'react-icons/fa6';
import {Acme} from 'next/font/google';

const acme = Acme({weight: '400', subsets: ['latin']});

export default function Header(): ReactElement {
    const pathname = usePathname();

    return (
        <header className={'page-bleed ' + styles.header}>
            <Link href="/" className={`${styles.logo} + ${acme.className}`}>
                Schort
            </Link>

            <nav>
                <ul>
                    <li>
                        <Link href="/" className={pathname === '/' ? styles.active : ''}>
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link href="/dashboard" className={pathname === '/dashboard' ? styles.active : ''}>
                            Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="https://github.com/BijanProgrammerWebsites/projects-schort/"
                            className={styles.external}
                        >
                            GitHub
                            <FaArrowUpRightFromSquare />
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className={styles.auth}>
                <Link href="/auth" className={styles['call-to-action']}>
                    Sign Up for FREE
                </Link>
            </div>
        </header>
    );
}

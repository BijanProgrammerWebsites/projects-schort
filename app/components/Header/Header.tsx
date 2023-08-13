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
            <svg className={styles.blob}>
                <path d="M0,367.99C70.563,374.027,145.498,356.59,200.473,311.943C253.449,268.92,266.471,196.502,290.028,132.451C311.79,73.281,331.723,15.187,332.8,-47.849C334.034,-120.075,349.168,-207.443,296.681,-257.075C243.527,-307.338,152.614,-260.306,83.32,-283.761C9.297,-308.817,-38.747,-404.243,-116.555,-396.951C-193.103,-389.777,-248.819,-315.53,-287.381,-249.017C-322.468,-188.499,-312.3,-115.539,-320.02,-46.012C-327.452,20.915,-358.543,89.73,-331.862,151.557C-305.056,213.674,-236.246,242.472,-179.578,279.429C-122.518,316.642,-67.874,362.183,0,367.99"></path>
            </svg>

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
                <Link href="/" className={styles['call-to-action']}>
                    Sign Up for FREE
                </Link>
            </div>
        </header>
    );
}

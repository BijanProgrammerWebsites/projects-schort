import {ReactElement} from 'react';

import Link from 'next/link';

import {FaGithub} from 'react-icons/fa';

import styles from './footer.module.scss';

export default function FooterComponent(): ReactElement {
    return (
        <footer className={'page-bleed ' + styles.footer}>
            <small className={styles.copyright}>Copyright &copy; 2023 BijanProgrammer.com</small>

            <Link
                href="https://github.com/BijanProgrammerWebsites/projects-schort/"
                className={styles.external}
                target="_blank"
            >
                <FaGithub />
                Source on GitHub
            </Link>
        </footer>
    );
}

import {ReactElement} from 'react';

import {FaGithub} from 'react-icons/fa';

import LinkComponent, {LinkComponentVariant} from '@/app/components/link/link.component';

import styles from './footer.module.scss';

export default function FooterComponent(): ReactElement {
    return (
        <footer className={'page-bleed ' + styles.footer}>
            <small className={styles.copyright}>Copyright &copy; 2023 BijanProgrammer.com</small>

            <LinkComponent
                href="https://github.com/BijanProgrammerWebsites/projects-schort/"
                variant={LinkComponentVariant.GHOST}
                target="_blank"
            >
                <FaGithub />
                Source on GitHub
            </LinkComponent>
        </footer>
    );
}

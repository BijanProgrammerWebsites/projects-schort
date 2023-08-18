import {ReactElement} from 'react';

import {Link} from '@prisma/client';

import LinkComponent from '@/app/components/link/link.component';

import styles from './generator-list.module.scss';

export default function GeneratorListComponent({links}: {links: Link[]}): ReactElement {
    return (
        <ul className={styles['generator-list-component']}>
            {links.map((link) => (
                <li key={link.id}>
                    <div className={styles.alias}>{link.alias}</div>

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

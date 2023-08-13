import styles from './page.module.scss';
import {ReactElement} from 'react';

export default function Home(): ReactElement {
    return (
        <div className={styles['home-page']}>
            <h1>Hello, friend!</h1>
        </div>
    );
}

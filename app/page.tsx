import styles from './page.module.scss';
import {ReactElement} from 'react';
import {Acme} from 'next/font/google';

const acme = Acme({weight: '400', subsets: ['latin']});

export default function Home(): ReactElement {
    return (
        <div className={styles['home-page']}>
            <svg className={styles.blob}>
                <path d="M1440 997.28C1526.783 1007.1990000000001 1616.831 996.427 1693.011 953.692 1771.632 909.588 1830.612 837.469 1869.694 756.235 1909.2939999999999 673.925 1933.897 581.09 1915.296 491.663 1897.173 404.534 1835.5819999999999 334.09299999999996 1769.49 274.496 1708.964 219.918 1634.1399999999999 187.99900000000002 1555.365 167.10199999999998 1478.284 146.654 1397.402 131.901 1321.254 155.58800000000002 1245.694 179.09199999999998 1194.542 243.164 1136.8229999999999 297.295 1072.1779999999999 357.922 986.711 406.003 963.142 491.438 938.804 579.66 961.2570000000001 678.952 1010.202 756.282 1056.6979999999999 829.742 1145.786 857.2909999999999 1221.617 899.8109999999999 1292.586 939.605 1359.162 988.04 1440 997.28"></path>
            </svg>

            <div className={styles.hero}>
                <h1>
                    <div className={styles.subtitle}>
                        make it <span className={styles.schort}>schort</span>
                    </div>
                    <div className={`${styles.title} ${acme.className}`}>
                        <span className={styles['size-matters']}>size matters!</span>
                    </div>
                </h1>
            </div>
        </div>
    );
}

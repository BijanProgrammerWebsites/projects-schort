import styles from './page.module.scss';
import {ReactElement} from 'react';
import {Acme} from 'next/font/google';
import Image from 'next/image';

import heroIllustration from './assets/illustrations/hero.svg';
import Link from 'next/link';

const acme = Acme({weight: '400', subsets: ['latin']});

export default function Home(): ReactElement {
    return (
        <div className={styles['home-page']}>
            <div className={styles.hero}>
                <div>
                    <h1>
                        <div className={styles.subtitle}>Keep it short</div>
                        <div className={`${styles.title} ${acme.className}`}>
                            <span className={styles['size-matters']}>size matters!</span>
                        </div>
                    </h1>

                    <p className={styles.description}>
                        We can help you generate a short link from any URL. Short links are easier to share in social
                        medias and they are also more likely to be remembered.
                    </p>

                    <div className={styles['input-box']}>
                        <input type="text" placeholder="Put your link here..." />
                        <button className={acme.className}>Generate</button>
                    </div>

                    <p className={styles['suggestion']}>
                        <strong>But Wait!</strong> There is an even better option... Sign up and see the links that you
                        have been generates. You can even edit them or remove them entirely.{' '}
                        <Link href="/auth" className={styles['call-to-action']}>
                            Sign up for FREE
                        </Link>
                    </p>
                </div>

                <Image
                    src={heroIllustration}
                    alt="an illustration of a middleman that is sitting between searched url and database"
                    width={1000}
                />
            </div>
        </div>
    );
}

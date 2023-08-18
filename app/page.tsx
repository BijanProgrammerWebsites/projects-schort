import {ReactElement} from 'react';

import {Luckiest_Guy} from 'next/font/google';
import Image from 'next/image';

import heroIllustration from '@/app/assets/illustrations/hero.svg';

import GeneratorComponent from '@/app/components/generator/generator.component';

import styles from './page.module.scss';

const luckiestGuy = Luckiest_Guy({weight: '400', subsets: ['latin']});

export default function Home(): ReactElement {
    return (
        <div className={styles['home-page']}>
            <section className={styles.hero}>
                <div>
                    <h1>
                        <div className={styles.subtitle}>keep it short</div>
                        <div className={`${styles.title} ${luckiestGuy.className}`}>
                            <span className={styles['size-matters']}>size matters!</span>
                        </div>
                    </h1>

                    <p className={styles.description}>
                        We can help you generate a short link from any URL. Short links are easier to share in social
                        medias and they are also more likely to be remembered.
                    </p>
                </div>

                <Image
                    src={heroIllustration}
                    alt="an illustration of a mobile phone that has a lot of messages, contacts and ratings floating around it"
                />
            </section>

            <section className={styles.generator}>
                <GeneratorComponent />
            </section>
        </div>
    );
}

import {ReactElement} from 'react';

import {Luckiest_Guy} from 'next/font/google';
import Image from 'next/image';

import {getServerSession} from 'next-auth/next';
import {nextAuthOptions} from '@/app/api/auth/[...nextauth]/options';

import heroIllustration from '@/app/assets/illustrations/hero.svg';

import GeneratorComponent from '@/app/components/generator/generator.component';
import LinkComponent from '@/app/components/link/link.component';

import styles from './page.module.scss';

const luckiestGuy = Luckiest_Guy({weight: '400', subsets: ['latin']});

export default async function Home(): Promise<ReactElement> {
    const session = await getServerSession(nextAuthOptions);

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

                    {!session?.user && (
                        <p className={styles['suggestion']}>
                            <strong>But Wait!</strong> There is an even better option... Sign up and manage the links
                            that you have generated. You can even edit them or remove them entirely. Otherwise you
                            cannot see them after you refresh the page. You can still use and share them and they will
                            work but there is no way to see or edit them.{' '}
                            <LinkComponent href="/auth">Sign up for FREE</LinkComponent>.
                        </p>
                    )}
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

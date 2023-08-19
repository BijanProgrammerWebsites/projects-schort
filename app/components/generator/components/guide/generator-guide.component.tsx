import {ReactElement} from 'react';

import styles from './generator-guide.module.scss';

export default function GeneratorGuideComponent(): ReactElement {
    return (
        <div className={styles['generator-guide-component']}>
            <header>
                <h2>How to Use This?</h2>
            </header>

            <main>
                <p>
                    Alias is a unique name that we will use to identify your link with. You can use lowercase letters,
                    digits and hyphens (-) for alias. It has to contain 3 to 32 characters.
                </p>
                <p>Filling out alias input is optional; If you choose to leave it blank, we will create one for you.</p>
                <p>
                    Link has to be a valid URL. If a user click on the link that was generated for you, we will redirect
                    them to the original URL.
                </p>
            </main>
        </div>
    );
}

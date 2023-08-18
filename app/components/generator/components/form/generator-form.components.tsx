import {FormEvent, ReactElement, useState} from 'react';

import {Link} from '@prisma/client';

import ButtonComponent, {ButtonComponentVariant} from '@/app/components/button/button.component';

import formStyles from '@/app/styles/form.module.scss';
import styles from './generator-form.module.scss';

export default function GeneratorFormComponents({
    addLinkToList,
}: {
    addLinkToList: (link: Link) => Promise<void>;
}): ReactElement {
    const [alias, setAlias] = useState<string>('');
    const [original, setOriginal] = useState<string>('');

    const formSubmitHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const response = await fetch('/api/link/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({original, alias}),
        });

        if (!response.ok) {
            console.log('error', response);
        } else {
            const addedLink = await response.json();

            if (!addedLink) {
                console.log('error');
            } else {
                await addLinkToList(addedLink);
            }
        }
    };

    return (
        <div className={styles['generator-form-component']}>
            <div className={`${formStyles['form-container']} ${styles['form-container']}`}>
                <header>
                    <h2>Let&apos;s Make it Happen!</h2>
                </header>

                <main>
                    <form onSubmit={formSubmitHandler}>
                        <div className={formStyles['fields-wrapper']}>
                            <label>
                                <div className={formStyles.title}>Alias (Optional)</div>
                                <div className={formStyles.field}>
                                    <input
                                        type="text"
                                        name="alias"
                                        value={alias}
                                        onChange={(e): void => setAlias(e.target.value)}
                                    />
                                </div>
                            </label>

                            <label>
                                <div className={formStyles.title}>Link</div>
                                <div className={formStyles.field}>
                                    <input
                                        type="url"
                                        name="url"
                                        value={original}
                                        onChange={(e): void => setOriginal(e.target.value)}
                                    />
                                </div>
                            </label>

                            <ButtonComponent variant={ButtonComponentVariant.PRIMARY} type="submit">
                                Generate
                            </ButtonComponent>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}

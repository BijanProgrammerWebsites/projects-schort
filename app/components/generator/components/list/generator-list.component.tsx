import {ChangeEvent, Dispatch, FormEvent, ReactElement, SetStateAction, useState} from 'react';

import {Link} from '@prisma/client';

import ButtonComponent, {ButtonComponentSize, ButtonComponentVariant} from '@/app/components/button/button.component';
import LinkComponent from '@/app/components/link/link.component';

import formStyles from '@/app/styles/form.module.scss';
import styles from './generator-list.module.scss';

export default function GeneratorListComponent({
    links,
    setLinks,
    isEditable,
}: {
    links: Link[];
    setLinks: Dispatch<SetStateAction<Link[]>>;
    isEditable: boolean;
}): ReactElement {
    return (
        <ul className={styles['generator-list-component']}>
            {links.map((link) => (
                <GeneratorListItemComponent key={link.id} link={link} setLinks={setLinks} isEditable={isEditable} />
            ))}
        </ul>
    );
}

function GeneratorListItemComponent({
    link,
    setLinks,
    isEditable,
}: {
    link: Link;
    setLinks: Dispatch<SetStateAction<Link[]>>;
    isEditable: boolean;
}): ReactElement {
    const [alias, setAlias] = useState<string>(link.alias);
    const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState<boolean>(true);

    const formSubmitHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const response = await fetch('/api/link', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: link.id, alias}),
        });

        if (!response.ok) {
            console.log('error', response);
        } else {
            const result = await response.json();

            if (!result) {
                console.log('error');
            } else {
                console.log('result', result);

                setLinks((previousValue) => previousValue.map((x) => (x.id === link.id ? {...x, alias} : x)));
                setIsConfirmButtonDisabled(true);
            }
        }
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setAlias(e.target.value);
        setIsConfirmButtonDisabled(false);
    };

    const copyButtonClickHandler = async (): Promise<void> => {
        const content = `https://schort.ir/${link.alias}`;

        if ('clipboard' in navigator) {
            await navigator.clipboard.writeText(content);
        } else {
            document.execCommand('copy', true, content);
        }
    };

    const removeButtonClickHandler = async (): Promise<void> => {
        const response = await fetch('/api/link', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: link.id}),
        });

        if (!response.ok) {
            console.log('error', response);
        } else {
            const result = await response.json();

            if (!result) {
                console.log('error');
            } else {
                console.log('result', result);

                setLinks((previousValue) => previousValue.filter((x) => x.id !== link.id));
            }
        }
    };

    return (
        <li>
            <form onSubmit={(e): Promise<void> => formSubmitHandler(e)}>
                <div className={`${formStyles.field} ${styles.field}`}>
                    <input type="text" value={alias} readOnly={!isEditable} required onChange={inputChangeHandler} />
                </div>

                <div className={styles.buttons}>
                    {isEditable && (
                        <ButtonComponent
                            title="Confirm"
                            variant={ButtonComponentVariant.SUCCESS}
                            size={ButtonComponentSize.INHERIT}
                            type="submit"
                            disabled={isConfirmButtonDisabled}
                        >
                            Confirm
                        </ButtonComponent>
                    )}

                    <ButtonComponent
                        title="Copy"
                        variant={ButtonComponentVariant.PRIMARY}
                        size={ButtonComponentSize.INHERIT}
                        onClick={(): Promise<void> => copyButtonClickHandler()}
                    >
                        Copy
                    </ButtonComponent>

                    {isEditable && (
                        <ButtonComponent
                            title="Remove"
                            variant={ButtonComponentVariant.DANGER}
                            size={ButtonComponentSize.INHERIT}
                            onClick={(): Promise<void> => removeButtonClickHandler()}
                        >
                            Remove
                        </ButtonComponent>
                    )}
                </div>
            </form>

            <div className={styles.original}>
                <LinkComponent href={link.original} isExternal={true}>
                    {link.original}
                </LinkComponent>
            </div>
        </li>
    );
}

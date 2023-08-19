'use client';

import {FormEvent, ReactElement, useState} from 'react';

import {useRouter} from 'next/navigation';

import {signIn} from 'next-auth/react';

import {User} from '@prisma/client';

import {FaGithub} from 'react-icons/fa';

import ButtonComponent, {ButtonComponentSize, ButtonComponentVariant} from '@/app/components/button/button.component';

import {ErrorDto} from '@/app/dto/error.dto';

import {SnackbarIdEnum} from '@/app/enums/snackbar-id.enum';
import {SnackbarVariantEnum} from '@/app/enums/snackbar-variant.enum';

import {useApi} from '@/app/hooks/api.hook';
import {useSnackbar} from '@/app/hooks/snackbar.hook';

import formStyles from '@/app/styles/form.module.scss';
import styles from './auth-form.module.scss';

enum FormType {
    LOGIN = 'Log In',
    SIGNUP = 'Sign Up',
}

export default function AuthFormComponent(): ReactElement {
    const {fetchData} = useApi();
    const {addSnackbar} = useSnackbar();

    const [formType, setFormType] = useState<FormType>(FormType.SIGNUP);

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const router = useRouter();

    const githubButtonClickHandler = async (): Promise<void> => {
        const result = await signIn('github');

        console.log('github result', result);

        if (!result?.error) {
            console.log('success');

            router.push('/');
        } else {
            console.log('failed');

            setError(result.error);
        }
    };

    const formSubmitHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (formType === FormType.LOGIN) {
            await logInWithCredentials();
        } else {
            const result = await fetchData<User>('POST', '/api/auth/sign-up', {name: username, email, password});

            addSnackbar({
                id: SnackbarIdEnum.SIGNUP_SUCCESS,
                variant: SnackbarVariantEnum.SUCCESS,
                message: 'You successfully signed up.',
            });

            if (!(result instanceof ErrorDto)) {
                await logInWithCredentials();
            }
        }
    };

    const logInWithCredentials = async (): Promise<void> => {
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (!(result instanceof ErrorDto)) {
            addSnackbar({
                id: SnackbarIdEnum.LOGIN_SUCCESS,
                variant: SnackbarVariantEnum.SUCCESS,
                message: `Hello, friend!`,
            });

            router.push('/');
        }
    };

    return (
        <div className={styles['auth-form']}>
            <div className={formStyles['form-container']}>
                <header>
                    <h1>{formType === FormType.LOGIN ? 'Welcome Back Buddy!' : "Let's Get Acquainted!"}</h1>

                    <p>
                        {formType === FormType.LOGIN ? (
                            <>
                                We haven&apos;t met yet?{' '}
                                <ButtonComponent
                                    variant={ButtonComponentVariant.LINK}
                                    size={ButtonComponentSize.INHERIT}
                                    onClick={(): void => setFormType(FormType.SIGNUP)}
                                >
                                    Create an account
                                </ButtonComponent>
                                .
                            </>
                        ) : (
                            <>
                                Do I know you from somewhere?{' '}
                                <ButtonComponent
                                    variant={ButtonComponentVariant.LINK}
                                    size={ButtonComponentSize.INHERIT}
                                    onClick={(): void => setFormType(FormType.LOGIN)}
                                >
                                    Log in
                                </ButtonComponent>
                                .
                            </>
                        )}
                    </p>
                </header>

                <main>
                    <form onSubmit={formSubmitHandler}>
                        <div className={formStyles['fields-wrapper']}>
                            <ButtonComponent icon={<FaGithub />} onClick={githubButtonClickHandler}>
                                {formType} with GitHub
                            </ButtonComponent>
                        </div>

                        <div className={formStyles.separator}>or</div>

                        <div className={formStyles['fields-wrapper']}>
                            <label>
                                <div className={formStyles.title}>Email</div>
                                <div className={formStyles.field}>
                                    <input
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e): void => setEmail(e.target.value)}
                                    />
                                </div>
                            </label>

                            {formType === FormType.SIGNUP && (
                                <label>
                                    <div className={formStyles.title}>Username</div>
                                    <div className={formStyles.field}>
                                        <input
                                            type="text"
                                            name="username"
                                            autoComplete="username"
                                            required
                                            value={username}
                                            onChange={(e): void => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className={formStyles.hint}>
                                        Can contain lowercase letters (a-z), uppercase letters (A-Z) and digits (0-9).
                                    </div>
                                </label>
                            )}

                            <label>
                                <div className={formStyles.title}>Password</div>
                                <div className={formStyles.field}>
                                    <input
                                        type={isPasswordVisible ? 'text' : 'password'}
                                        name="password"
                                        autoComplete={
                                            formType === FormType.SIGNUP ? 'new-password' : 'current-password'
                                        }
                                        required
                                        value={password}
                                        onChange={(e): void => setPassword(e.target.value)}
                                    />
                                    <ButtonComponent
                                        variant={ButtonComponentVariant.GHOST}
                                        onClick={(): void => setIsPasswordVisible((previousValue) => !previousValue)}
                                    >
                                        {isPasswordVisible ? 'Hide' : 'Show'}
                                    </ButtonComponent>
                                </div>
                                {formType === FormType.SIGNUP && (
                                    <div className={formStyles.hint}>
                                        Has to contain 8 to 16 characters. Has to contain at least one lowercase letter
                                        (a-z), one uppercase letter (A-Z) and one digit (0-9).
                                    </div>
                                )}
                            </label>

                            <ButtonComponent variant={ButtonComponentVariant.PRIMARY} type="submit">
                                {formType}
                            </ButtonComponent>
                        </div>

                        {error && <div className={formStyles.error}>{error}</div>}
                    </form>
                </main>
            </div>
        </div>
    );
}

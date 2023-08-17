'use client';

import {FormEvent, ReactElement, useState} from 'react';

import {useRouter} from 'next/navigation';

import {signIn} from 'next-auth/react';

import {FaEye, FaEyeSlash, FaGithub} from 'react-icons/fa';

import styles from './auth-form.module.scss';

enum FormType {
    LOGIN = 'Log In',
    SIGNUP = 'Sign Up',
}

export default function AuthFormComponent(): ReactElement {
    const [formType, setFormType] = useState<FormType>(FormType.LOGIN);

    const [username, setUsername] = useState<string>('BijanProgrammer');
    const [email, setEmail] = useState<string>('bijaneisapour@gmail.com');
    const [password, setPassword] = useState<string>('1234');

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const router = useRouter();

    const formSubmitHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (formType === FormType.LOGIN) {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            console.log('credentials result', result);

            if (!result?.error) {
                console.log('success');

                router.push('/');
            } else {
                console.log('failed');

                setError(result.error);
            }
        } else {
            console.log('process.env.NEXT_PUBLIC_HOST', process.env.NEXT_PUBLIC_HOST);

            const url = new URL('/api/auth/sign-up', process.env.NEXT_PUBLIC_HOST);
            console.log('url', url);

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({name: username, email, password}),
                });

                const result = await response.json();
                console.log('fetch result', result);
            } catch (error) {
                console.log('fetch error', error);
            }
        }
    };

    return (
        <div className={styles['auth-form']}>
            <header>
                <h1>{formType === FormType.LOGIN ? 'Log In to Your Account' : 'Create a New Account'}</h1>

                <p>
                    {formType === FormType.LOGIN ? (
                        <>
                            First time?{' '}
                            <button type="button" onClick={(): void => setFormType(FormType.SIGNUP)}>
                                Create an account
                            </button>
                            .
                        </>
                    ) : (
                        <>
                            Friend?{' '}
                            <button type="button" onClick={(): void => setFormType(FormType.LOGIN)}>
                                Log in
                            </button>
                            .
                        </>
                    )}
                </p>
            </header>

            <main>
                <form onSubmit={formSubmitHandler}>
                    <div className={styles.providers}>
                        <button className={styles.github} type="button">
                            <FaGithub></FaGithub>
                            {formType} with GitHub
                        </button>
                    </div>

                    <div className={styles.separator}>or</div>

                    <div className={styles.credentials}>
                        {formType === FormType.SIGNUP && (
                            <label>
                                <div className={styles.title}>Username</div>
                                <div className={styles.field}>
                                    <input
                                        type="text"
                                        name="username"
                                        required
                                        value={username}
                                        onChange={(e): void => setUsername(e.target.value)}
                                    />
                                </div>
                            </label>
                        )}

                        <label>
                            <div className={styles.title}>Email</div>
                            <div className={styles.field}>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={email}
                                    onChange={(e): void => setEmail(e.target.value)}
                                />
                            </div>
                        </label>

                        <label>
                            <div className={styles.title}>Password</div>
                            <div className={styles.field}>
                                <input
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    name="password"
                                    required
                                    value={password}
                                    onChange={(e): void => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={(): void => setIsPasswordVisible((previousValue) => !previousValue)}
                                >
                                    {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                        </label>

                        <button type="submit">{formType}</button>
                    </div>

                    {error && <div className={styles.error}>{error}</div>}
                </form>
            </main>
        </div>
    );
}

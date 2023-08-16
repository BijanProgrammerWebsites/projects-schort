import {NextAuthOptions, User} from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialProvider from 'next-auth/providers/credentials';

export const nextAuthOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        CredentialProvider({
            name: 'Credentials',
            credentials: {
                name: {
                    label: 'Username',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            async authorize(credentials): Promise<User | null> {
                const user: User & {password: string} = {id: '23', name: 'BijanProgrammer', password: '1234'};

                if (credentials?.name === user.name && credentials?.password === user.password) {
                    return {id: user.id, name: user.name};
                }

                return null;
            },
        }),
    ],
};

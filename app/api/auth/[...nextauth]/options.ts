import {NextAuthOptions, User} from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialProvider from 'next-auth/providers/credentials';

import bcrypt from 'bcrypt';

import {PrismaService} from '@/app/services/prisma.service';

const prisma = PrismaService.client;

export const nextAuthOptions: NextAuthOptions = {
    pages: {
        signIn: '/auth',
    },
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        CredentialProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            async authorize(credentials): Promise<User | null> {
                if (!credentials) {
                    return null;
                }

                const user = await prisma.user.findUnique({where: {email: credentials.email}});
                if (!user) {
                    return null;
                }

                const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                if (!isValidPassword) {
                    return null;
                }

                return {id: user.id, name: user.name, email: user.email};
            },
        }),
    ],
};

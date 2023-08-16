import {ReactElement, ReactNode} from 'react';

import type {Metadata} from 'next';
import {Geologica} from 'next/font/google';

import HeaderComponent from '@/app/components/header/header.component';
import FooterComponent from '@/app/components/footer/footer.component';

import {AuthProvider} from '@/app/providers/auth.provider';

import './globals.scss';

const geologica = Geologica({weight: ['400', '700'], subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Schort',
    description: 'We can help you generate a short link from any URL.',
};

export default function RootLayout({children}: {children: ReactNode}): ReactElement {
    return (
        <html lang="en">
            <body className={geologica.className}>
                <AuthProvider>
                    <HeaderComponent />

                    <main className="page-bleed">{children}</main>

                    <FooterComponent />
                </AuthProvider>
            </body>
        </html>
    );
}

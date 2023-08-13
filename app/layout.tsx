import './globals.scss';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {ReactElement} from 'react';
import Header from '@/app/components/Header/Header';

const inter = Inter({weight: ['400', '700'], subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Schort',
    description: 'Keep it short, size matters.',
};

export default function RootLayout({children}: {children: React.ReactNode}): ReactElement {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />

                <main className="page-bleed">{children}</main>
            </body>
        </html>
    );
}

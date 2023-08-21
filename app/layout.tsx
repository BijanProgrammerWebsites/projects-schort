import {ReactElement, ReactNode} from 'react';

import type {Metadata} from 'next';
import {Geologica} from 'next/font/google';

import HeaderComponent from '@/app/components/header/header.component';
import FooterComponent from '@/app/components/footer/footer.component';

import AuthProvider from '@/app/providers/auth/auth.provider';
import AnimationProvider from '@/app/providers/animation/animation.provider';
import SnackbarProvider from '@/app/providers/snackbar/snackbar.provider';

import './globals.scss';

const geologica = Geologica({weight: ['400', '700'], subsets: ['latin']});

const metadataTitle = 'Schort';
const metadataDescription =
    'We can help you generate a short link from any URL. Short links are easier to share in social medias and they are also more likely to be remembered.';

export const metadata: Metadata = {
    title: metadataTitle,
    description: metadataDescription,
    robots: 'index, follow',
    viewport: 'width=device-width, initial-scale=1.0',
    openGraph: {
        title: metadataTitle,
        description: metadataDescription,
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        title: metadataTitle,
        description: metadataDescription,
        card: 'app',
    },
};

export default function RootLayout({children}: {children: ReactNode}): ReactElement {
    return (
        <html lang="en">
            <body className={geologica.className}>
                <AuthProvider>
                    <AnimationProvider>
                        <SnackbarProvider>
                            <HeaderComponent />

                            <main className="page-bleed">{children}</main>

                            <FooterComponent />
                        </SnackbarProvider>
                    </AnimationProvider>
                </AuthProvider>
            </body>
        </html>
    );
}

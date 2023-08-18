'use client';

import {ReactElement, useEffect, useState} from 'react';

import {useSession} from 'next-auth/react';

import {Link} from '@prisma/client';

import Loading from '@/app/loading';

import GeneratorFormComponents from './components/form/generator-form.components';
import GeneratorGuideComponent from '@/app/components/generator/components/guide/generator-guide.component';
import GeneratorListComponent from '@/app/components/generator/components/list/generator-list.component';

import styles from './generator.module.scss';

export default function GeneratorComponent(): ReactElement {
    const {status: authStatus} = useSession();

    const [serverLinks, setServerLinks] = useState<Link[]>([]);
    const [clientLinks, setClientLinks] = useState<Link[]>([]);

    const fetchServerLinks = async (): Promise<void> => {
        const response = await fetch('/api/link');
        const data: Link[] = await response.json();

        setServerLinks(data);
    };

    useEffect(() => {
        if (authStatus === 'authenticated') {
            fetchServerLinks().then();
        }
    }, [authStatus]);

    const addLinkToList = async (addedLink: Link): Promise<void> => {
        if (authStatus === 'authenticated') {
            setServerLinks((previousValue) => [addedLink, ...previousValue]);
        } else {
            setClientLinks((previousValue) => [addedLink, ...previousValue]);
        }
    };

    return (
        <div className={styles['generator-component']}>
            <div className={styles.form}>
                <GeneratorFormComponents addLinkToList={addLinkToList} />
            </div>

            <div className={styles.guide}>
                <GeneratorGuideComponent />
            </div>

            <div className={styles.list}>
                {authStatus === 'loading' ? (
                    <Loading />
                ) : authStatus === 'authenticated' ? (
                    <GeneratorListComponent links={serverLinks} setLinks={setServerLinks} />
                ) : (
                    <GeneratorListComponent links={clientLinks} setLinks={setClientLinks} />
                )}
            </div>
        </div>
    );
}

import {ReactElement, ReactNode} from 'react';

import {FaCheck, FaInfo, FaTimes} from 'react-icons/fa';

import {SnackbarVariantModel} from '@/app/models/snackbar-variant.model';

import styles from './snackbar.module.scss';

export default function SnackbarComponent({
    variant = SnackbarVariantModel.BASIC,
    children,
}: {
    variant: SnackbarVariantModel;
    children: ReactNode;
}): ReactElement {
    return (
        <div className={`${styles['snackbar-component']} ${styles[variant]}`}>
            <div className={styles.icon}>
                {variant === SnackbarVariantModel.BASIC && <FaInfo />}
                {variant === SnackbarVariantModel.SUCCESS && <FaCheck />}
                {variant === SnackbarVariantModel.DANGER && <FaTimes />}
            </div>

            <div className={styles.message}>{children}</div>
        </div>
    );
}

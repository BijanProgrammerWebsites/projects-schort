import {ButtonHTMLAttributes, DetailedHTMLProps, ReactElement, ReactNode} from 'react';

import styles from './button.module.scss';

export enum ButtonComponentVariant {
    BASIC = 'basic',
    PRIMARY = 'primary',
    GHOST = 'ghost',
    LINK = 'link',
}

export enum ButtonComponentSize {
    INHERIT = '',
    LARGE = 'large',
}

interface ButtonComponentProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    icon?: ReactElement;
    variant?: ButtonComponentVariant;
    size?: ButtonComponentSize;
    isRounded?: boolean;
    children?: ReactNode;
}

export default function ButtonComponent({
    type = 'button',
    icon,
    variant = ButtonComponentVariant.BASIC,
    size = ButtonComponentSize.LARGE,
    isRounded,
    children,
    ...htmlButtonElementProps
}: ButtonComponentProps): ReactElement {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${styles[size]} ${isRounded ? 'rounded' : ''}`}
            type={type}
            {...htmlButtonElementProps}
        >
            {icon && <div className={styles.icon}>{icon}</div>}
            {children}
        </button>
    );
}

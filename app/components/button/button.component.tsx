import {ButtonHTMLAttributes, DetailedHTMLProps, ReactElement, ReactNode} from 'react';

import styles from './button.module.scss';

export enum ButtonComponentVariant {
    BASIC = 'basic',
    PRIMARY = 'primary',
    GHOST = 'ghost',
    LINK = 'link',
}

interface ButtonComponentProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    icon?: ReactElement;
    variant?: ButtonComponentVariant;
    isRounded?: boolean;
    fontSize?: string;
    fontWeight?: number;
    children?: ReactNode;
}

export default function ButtonComponent({
    type = 'button',
    icon,
    variant = ButtonComponentVariant.BASIC,
    isRounded,
    fontSize = '1.8rem',
    fontWeight = 700,
    children,
    ...htmlButtonElementProps
}: ButtonComponentProps): ReactElement {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${isRounded ? 'rounded' : ''}`}
            style={{fontSize, fontWeight}}
            type={type}
            {...htmlButtonElementProps}
        >
            {icon && <div className={styles.icon}>{icon}</div>}
            <div className={styles.children}>{children}</div>
        </button>
    );
}

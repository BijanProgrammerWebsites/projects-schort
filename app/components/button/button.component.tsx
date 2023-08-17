import {ButtonHTMLAttributes, DetailedHTMLProps, ReactElement, ReactNode} from 'react';

import styles from './button.module.scss';

export enum ButtonComponentVariant {
    BASIC = 'basic',
    PRIMARY = 'primary',
    GHOST = 'ghost',
    LINK = 'link',
}

export enum ButtonComponentSize {
    UNSET = '',
    INHERIT = 'size--inherit',
    NORMAL = 'size--normal',
    LARGE = 'size--large',
}

interface ButtonComponentProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    icon?: ReactElement;
    variant?: ButtonComponentVariant;
    size?: ButtonComponentSize;
    children?: ReactNode;
}

export default function ButtonComponent({
    type = 'button',
    icon,
    variant = ButtonComponentVariant.BASIC,
    size = ButtonComponentSize.LARGE,
    children,
    ...htmlButtonElementProps
}: ButtonComponentProps): ReactElement {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${styles[size]}`}
            type={type}
            {...htmlButtonElementProps}
        >
            {icon && <div className={styles.icon}>{icon}</div>}
            {children}
        </button>
    );
}

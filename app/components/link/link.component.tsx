import {HTMLAttributeAnchorTarget, ReactElement, ReactNode} from 'react';

import Link, {LinkProps} from 'next/link';

import styles from './link.module.scss';

export enum LinkComponentVariant {
    BASIC = 'basic',
    BUTTON = 'button',
    GHOST = 'ghost',
}

export enum LinkComponentSize {
    INHERIT = '',
    LARGE = 'size--large',
}

interface LinkComponentProps extends LinkProps {
    target?: HTMLAttributeAnchorTarget;
    variant?: LinkComponentVariant;
    size?: LinkComponentSize;
    fontClassName?: string;
    children?: ReactNode;
}

export default function LinkComponent({
    target = '_self',
    variant = LinkComponentVariant.BASIC,
    size = LinkComponentSize.INHERIT,
    fontClassName,
    children,
    ...linkProps
}: LinkComponentProps): ReactElement {
    return (
        <Link
            className={`${styles.link} ${styles[variant]} ${styles[size]} ${fontClassName}`}
            target={target}
            {...linkProps}
        >
            {children}
        </Link>
    );
}

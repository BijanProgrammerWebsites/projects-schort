'use client';

import {ReactElement, ReactNode, useEffect} from 'react';

import {motion, Transition, useAnimation, Variants} from 'framer-motion';

import styles from './pop.module.scss';

interface PopAnimationProps {
    baseDelay?: number;
    shouldStart?: boolean;
    doneCallback?: () => void;
    className?: string;
    children: ReactNode;
}

export default function PopAnimation({
    shouldStart = true,
    doneCallback,
    baseDelay = 0,
    className,
    children,
}: PopAnimationProps): ReactElement {
    const controls = useAnimation();

    const variants: Variants = {
        hidden: {opacity: 0, scale: 0.64, transformOrigin: 'center'},
        visible: {opacity: 1, scale: 1},
    };

    const transition: Transition = {
        duration: 0.36,
        ease: [0.48, 0, 0.16, 1.6],
        delay: baseDelay,
    };

    useEffect(() => {
        if (shouldStart) {
            controls.start('visible').then(doneCallback);
        }
    }, [controls, doneCallback, shouldStart]);

    return (
        <>
            <motion.span
                className={`${styles.wrapper} ${className}`}
                variants={variants}
                initial="hidden"
                animate={controls}
                transition={transition}
            >
                {children}
            </motion.span>
        </>
    );
}

'use client';

import {ReactElement, useEffect} from 'react';

import {motion, Transition, useAnimation, Variants} from 'framer-motion';

import styles from './popcorn.module.scss';

interface PopcornAnimationProps {
    shouldStart?: boolean;
    doneCallback?: () => void;
    baseDelay?: number;
    children: string;
}

export default function PopcornAnimation({
    shouldStart = true,
    doneCallback,
    baseDelay = 0,
    children,
}: PopcornAnimationProps): ReactElement {
    const controls = useAnimation();

    const variants: Variants = {
        hidden: {opacity: 0, y: 60, scale: 0.6, transformOrigin: 'bottom'},
        visible: {opacity: 1, y: 0, scale: 1},
    };

    const transition: Transition = {
        duration: 0.4,
        ease: [0.6, 0, 0.12, 1.8],
    };

    useEffect(() => {
        if (shouldStart) {
            controls.start('visible').then(doneCallback);
        }
    }, [controls, shouldStart]);

    return (
        <>
            {children.split('').map((character, index) => (
                <motion.span
                    className={styles.character}
                    key={index}
                    variants={variants}
                    initial="hidden"
                    animate={controls}
                    transition={{...transition, delay: baseDelay + index * 0.05 + Math.random() / 10}}
                >
                    {character}
                </motion.span>
            ))}
        </>
    );
}

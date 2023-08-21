'use client';

import {ReactElement} from 'react';

import {motion, Transition, Variants} from 'framer-motion';

import styles from './typewriter.module.scss';

interface TypewriterAnimationProps {
    baseDelay?: number;
    children: string;
}

export default function TypewriterAnimation({baseDelay = 0, children}: TypewriterAnimationProps): ReactElement {
    const variants: Variants = {
        hidden: {opacity: 0, x: -12},
        visible: {opacity: 1, x: 0},
    };

    const transition: Transition = {
        duration: 0.24,
        ease: 'linear',
    };

    return (
        <>
            {children.split(' ').map((word, index) => (
                <motion.span
                    className={styles.word}
                    key={index}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{...transition, delay: baseDelay + index * 0.048}}
                >
                    {word}{' '}
                </motion.span>
            ))}
        </>
    );
}

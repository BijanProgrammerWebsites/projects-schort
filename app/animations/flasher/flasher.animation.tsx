'use client';

import {ReactElement} from 'react';

import {motion, Transition, Variants} from 'framer-motion';

import styles from './flasher.module.scss';

interface FlasherAnimationProps {
    baseDelay?: number;
    children: string;
}

export default function FlasherAnimation({baseDelay = 0, children}: FlasherAnimationProps): ReactElement {
    const variants: Variants = {
        hidden: {opacity: 0, scale: 1.48, transformOrigin: 'center'},
        visible: {opacity: 1, scale: 1},
    };

    const transition: Transition = {
        duration: 0.48,
        ease: [0.6, 0, 0.18, 3.6],
    };

    return (
        <>
            {children.split(' ').map((character, index) => (
                <motion.span
                    className={styles.character}
                    key={index}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{...transition, delay: baseDelay + index * 0.6}}
                >
                    {character}{' '}
                </motion.span>
            ))}
        </>
    );
}

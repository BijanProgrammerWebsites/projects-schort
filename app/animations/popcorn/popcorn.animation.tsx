'use client';

import {ReactElement, useEffect, useRef} from 'react';

import styles from './popcorn.module.scss';
import {motion, Transition, useAnimation, useInView, Variants} from 'framer-motion';

interface PopcornAnimationProps {
    children: string;
}

export default function PopcornAnimation({children}: PopcornAnimationProps): ReactElement {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {once: true});

    const controls = useAnimation();

    const variants: Variants = {
        hidden: {opacity: 0, y: 60, scale: 0.6, transformOrigin: 'bottom'},
        visible: {opacity: 1, y: 0, scale: 1},
    };

    const transition: Transition = {
        duration: 0.6,
        ease: [0.6, 0, 0.12, 1.8],
    };

    useEffect(() => {
        if (isInView) {
            controls.start('visible').then();
        }
    }, [controls, isInView]);

    return (
        <div ref={ref} className={styles.wrapper}>
            {children.split('').map((character, index) => (
                <motion.span
                    key={index}
                    variants={variants}
                    initial="hidden"
                    animate={controls}
                    transition={{...transition, delay: index * 0.1 + Math.random() / 6}}
                >
                    {character}
                </motion.span>
            ))}
        </div>
    );
}

'use client';

import {ReactElement, ReactNode} from 'react';

import {motion, Transition, Variants} from 'framer-motion';

interface PopAnimationProps {
    baseDelay?: number;
    className: string;
    children: ReactNode;
}

export default function PopAnimation({baseDelay = 0, className, children}: PopAnimationProps): ReactElement {
    const variants: Variants = {
        hidden: {opacity: 0, scale: 0.64, transformOrigin: 'center'},
        visible: {opacity: 1, scale: 1},
    };

    const transition: Transition = {
        duration: 0.48,
        ease: [0.48, 0, 0.16, 1.6],
        delay: baseDelay,
    };

    return (
        <>
            <motion.div
                className={className}
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={transition}
            >
                {children}
            </motion.div>
        </>
    );
}

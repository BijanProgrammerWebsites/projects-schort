import {Dispatch, createContext} from 'react';

import {AnimationStatusModel} from '@/app/models/animation-status.model';
import {AnimationAction} from '@/app/reducers/animation.reducer';

interface AnimationContextType {
    animationStatus: AnimationStatusModel;
    dispatch: Dispatch<AnimationAction>;
}

export const defaultContextValue: AnimationContextType = {
    animationStatus: {
        sizeMatters: true,
        keepItShort: false,
        description: false,
        image: false,
        butWait: false,
        betterOption: false,
        suggestion: false,
        signUpForFree: false,
        headerLogo: false,
        headerAuth: false,
    },
    dispatch: () => {},
};

export const AnimationContext = createContext<AnimationContextType>(defaultContextValue);

import {ReactNode} from 'react';

import {SnackbarVariantModel} from '@/app/models/snackbar-variant.model';

export interface SnackbarModel {
    id: string;
    variant: SnackbarVariantModel;
    message: ReactNode;
}

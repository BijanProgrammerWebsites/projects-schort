import {SnackbarIdEnum} from '@/app/enums/snackbar-id.enum';

export class ErrorDto {
    public constructor(
        public message: string,
        public snackbarId: SnackbarIdEnum = SnackbarIdEnum.UNHANDLED_SERVER_ERROR
    ) {}
}

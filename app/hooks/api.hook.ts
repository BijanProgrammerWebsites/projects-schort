import {ErrorDto} from '@/app/dto/error.dto';

import {SnackbarVariantEnum} from '@/app/enums/snackbar-variant.enum';

import {useSnackbar} from '@/app/hooks/snackbar.hook';

type FetchDataType = <ResponseType>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    body?: unknown
) => Promise<ResponseType | ErrorDto>;

export function useApi(): {fetchData: FetchDataType} {
    const {addSnackbar} = useSnackbar();

    const fetchData = async <ResponseType, BodyType>(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        url: string,
        body?: BodyType
    ): Promise<ResponseType | ErrorDto> => {
        const result = await (async (): Promise<ResponseType | ErrorDto> => {
            try {
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });

                if (response?.ok) {
                    return await response.json();
                } else {
                    const error = await response.json();
                    return new ErrorDto(error.message);
                }
            } catch (error) {
                if (error instanceof ErrorDto) {
                    return error;
                }

                if (error instanceof SyntaxError) {
                    return new ErrorDto(
                        '[Parse Error] An error occurred while parsing server response. Please try again later.'
                    );
                }
            }

            return new ErrorDto('[Unhandled Error] An unhandled error occurred.');
        })();

        if (result instanceof ErrorDto) {
            addSnackbar({
                id: result.snackbarId,
                variant: SnackbarVariantEnum.DANGER,
                message: result.message,
            });
        }

        return result;
    };

    return {
        fetchData,
    };
}

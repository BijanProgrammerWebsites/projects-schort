import {ErrorDto} from '@/app/dto/error.dto';

export class ApiService {
    public static async fetchData<ResponseType, BodyType>(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        url: string,
        body?: BodyType
    ): Promise<ResponseType | ErrorDto> {
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
                return new ErrorDto(
                    '[Parse Error] An error occurred while parsing server response. Please try again later.'
                );
            }
        } catch (error) {
            if (error instanceof ErrorDto) {
                return error;
            }
        }

        return new ErrorDto('[Unhandled Error] An unhandled error occurred.');
    }
}

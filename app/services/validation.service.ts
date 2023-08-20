import {ErrorDto} from '@/app/dto/error.dto';
import {Session, User} from 'next-auth';

export class ValidationService {
    public static throwIfNotLoggedIn(
        session: Session | null
    ): asserts session is Required<Session & {user: User & {email: Required<string>}}> {
        if (!session?.user?.email) {
            throw new ErrorDto('You have to log in first.');
        }
    }

    public static throwIfInvalidLinkId(value: string): void {
        if (!value) {
            throw new ErrorDto('Link ID is required');
        }
    }

    public static throwIfInvalidUrl(value: string): void {
        try {
            new URL(value);
        } catch {
            throw new ErrorDto('Link must be a valid URL.');
        }
    }

    public static throwIfInvalidAlias(value: string): void {
        if (value.length < 3 || 32 < value.length) {
            throw new ErrorDto('Alias has to contain 3 to 32 characters.');
        }

        if (!/^[a-z0-9\-]+$/.test(value)) {
            throw new ErrorDto('Alias can only contain lowercase letters, digits and hyphens (-).');
        }
    }
}

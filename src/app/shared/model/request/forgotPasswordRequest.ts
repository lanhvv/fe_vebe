import { BaseRequest } from './BaseRequest';
export class ForgotPasswordRequest extends BaseRequest{
    email!: string;
    username!: string;
}

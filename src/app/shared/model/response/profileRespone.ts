import { BaseResponse } from 'src/app/shared/response/BaseResponse';

export class ProfileRespone extends BaseResponse {
    fullname!: string;
    cccd!: string;
    address!: string;
    numberPhone! : string;
    email!: string;
}

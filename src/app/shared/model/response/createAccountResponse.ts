import { BaseResponse } from 'src/app/shared/response/BaseResponse';
export class CreateAccountResponse extends BaseResponse{

     fullname!: string;
     statusName!: string;
     phoneNumber!: string;
     email!: string;
     role!: number ;
     nameRole!: string;
     username!: string;
     cccd!: string;
     idUser!: number;
     address!:string;
}

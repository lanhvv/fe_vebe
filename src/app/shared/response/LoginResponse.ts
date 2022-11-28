import {BaseResponse} from "./BaseResponse";

export class LoginResponse extends BaseResponse{
  username!:string;
  accessToken!:string;
  role!:[];
  refreshToken!:string;
}

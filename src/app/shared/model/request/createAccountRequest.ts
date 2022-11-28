import {BaseRequest} from "./BaseRequest";


export class CreateAccountRequest extends BaseRequest{
  username!: string;
  fullname!: string;
  password!: string;
  cccd!: string;
  address!: string;
  numberPhone! : string;
  email!: string;
  role!: number;
  status!: number;


  // constructor(username:string, fullname: string, password: string, cccd: string, address: string, numberPhone: string, email: string,
  //   role: number, status: number){
  //  this.username= username
  //  this.fullname= fullname;
  //  this.password = password;
  //  this.cccd= cccd;
  //  this.address= address;
  //  this.numberPhone = numberPhone;
  //  this.email = email;
  //  this.role = role;
  //  this.status = status
  // }


}

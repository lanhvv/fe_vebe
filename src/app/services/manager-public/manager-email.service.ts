import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../token-storage.service";
import {ForgotPasswordRequest} from "../../shared/model/request/forgotPasswordRequest";
import {environment} from "../../../environments/environment";
import {ChangePasswordRequest} from "../../shared/model/request/changePasswordRequest";
import {Observable} from "rxjs";
const AUTH_API = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ManagerEmailService {
  readonly URL = AUTH_API +"vibee/api/v1/auth"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ` + this.tokenService.getToken()!,
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }),
  };
  constructor(  private tokenService: TokenStorageService,private httpClient: HttpClient) { }
  forgotPassword(request: ForgotPasswordRequest){
    return this.httpClient.post<any>(this.URL+'/forgot', request,this.httpOptions);
  }
  changPassword(request:ChangePasswordRequest):Observable<any>{
    return this.httpClient.post<any>(this.URL+'change', request,this.httpOptions);
  }
}

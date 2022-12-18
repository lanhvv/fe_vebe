import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../../services/token-storage.service';
import { GetAccountItemsRequest } from '../../shared/model/request/getAccountItemsRequest';
import { CreateAccountRequest } from '../../shared/model/request/createAccountRequest';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {UpdateAccountRequest} from "../../shared/model/request/updateAccountRequest";
import {EditAccountRequest} from "../../shared/model/request/editAccountRequest";
const AUTH_API = environment.baseApi;
@Injectable({
  providedIn: 'root'
})

export class ManagerAccountService {
  readonly URL = AUTH_API+"user/";
  editAccountRequest!: EditAccountRequest;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ` + this.tokenService.getToken()!,
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }),
  };

  constructor(private httpClient: HttpClient,
    private tokenService: TokenStorageService) { }

  getAll(request: GetAccountItemsRequest) {
    return this.httpClient.get(this.URL + "getAll-user?pagenumber=" + request.page + "&pagesize=" + request.pageSize +
      "&language=" + request.language + "&search=" + request.searchText, this.httpOptions)

  }
  createAccount(request: CreateAccountRequest):Observable<any>{
    return this.httpClient.post<any>(this.URL+'create', request,this.httpOptions);
  }
  updateAccount(request: UpdateAccountRequest):Observable<any>{
    return this.httpClient.post<any>(this.URL+'update', request,this.httpOptions);
  }
  editAccount(request: number,language:string):Observable<any> {
    return this.httpClient.get(this.URL+'edit/'+request+'?language='+language,this.httpOptions);
  }
  deleteAccount(request: number,language:string):Observable<any>{
    return this.httpClient.post<any>(this.URL+'delete/'+request+'?language='+language,null,this.httpOptions);
  }
  unlockAccount(request: number,language:string):Observable<any>{
    return this.httpClient.post<any>(this.URL+'unlock/'+request+'?language='+language,null,this.httpOptions);
  }
  lockAccount(request: number,language:string):Observable<any>{
    return this.httpClient.post<any>(this.URL+'lock/'+request+'?language='+language,null,this.httpOptions);
  }
  checkAccount(request: CreateAccountRequest):Observable<any>{
    return this.httpClient.post<any>(this.URL+'checkAccount', request,this.httpOptions);
  }
  checkAccountUpdate(request: UpdateAccountRequest):Observable<any>{
    return this.httpClient.post<any>(this.URL+'checkAccount', request,this.httpOptions);
  }

}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {TokenStorageService} from "../token-storage.service";
import {ViewBillRequest} from "../../shared/model/response/ViewBillResquest";
import {TransactionBillRequest} from "../../shared/model/request/TransactionBillRequest";
import {environment} from "../../../environments/environment";
import { DebitBillRequest } from '../../shared/model/request/DebitBillRequest';
const AUTH_API = environment.baseApi;
@Injectable({
  providedIn: 'root'
})
export class BillService {
  api=AUTH_API+"bill";
  constructor(private httpClient: HttpClient,private route: Router, private tokenService: TokenStorageService) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer `+ this.tokenService.getToken()!,
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }),
  };

  saveBilltoRedis(request:TransactionBillRequest){
    return this.httpClient.post(this.api+"/save-bill",request,this.httpOptions);
  }
  transactionBill(request:TransactionBillRequest){
    return this.httpClient.post(this.api+"/transaction",request,this.httpOptions);
  }
  debit(request:DebitBillRequest){
    return this.httpClient.post(this.api+"/addDebit",request,this.httpOptions);
  }
}

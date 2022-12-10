import { Observable } from 'rxjs';
import { CreateDebitRequest } from './../../../shared/model/request/createDebitRequest';
import { GetOrderRequest } from './../../../shared/model/request/getOrderRequest';
import { TokenStorageService } from './../../token-storage.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PayDebit } from '../../../shared/model/request/payDebit';
import { UpdateDebitRequest } from '../../../shared/model/request/updateDebitRequest';

@Injectable({
  providedIn: 'root'
})
export class DebitService {
  readonly URL="http://localhost:1507/vibee/api/v1/auth/";
  key: string = " ";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer `+ this.tokenService.getToken()!,
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }),
  };
  constructor(private httpClient: HttpClient,
    private tokenService: TokenStorageService) {

  }
  getAll(request:GetOrderRequest){
    return this.httpClient.get(this.URL+"findAll?pagenumber="+request.page+"&pagesize="+request.pageSize+
    "&valuefilter="+request.filter.valueFilter+"&typefilter="+request.filter.typeFilter+"&language="+request.language+"&search="+request.searchText, this.httpOptions);
  }
  getById(request:number){
    return this.httpClient.get(this.URL+"findById/"+request, this.httpOptions);
  }
  create(request: CreateDebitRequest):Observable<any>{
    return this.httpClient.post<any>(this.URL+'createDebit', request,this.httpOptions);
  }
  getDetailBill(bill: number){
    return this.httpClient.get(this.URL+"getDetailByBill/"+bill, this.httpOptions);
  }
  pay(idDebit: number,request: UpdateDebitRequest){
    return this.httpClient.post<any>(this.URL+'payDebit/'+idDebit,request,this.httpOptions);
  }
}

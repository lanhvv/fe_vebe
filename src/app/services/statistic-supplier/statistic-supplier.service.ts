import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Filter} from "../../shared/model/Filter";
import {TokenStorageService} from "../token-storage.service";
import {environment} from "../../../environments/environment";
const AUTH_API = environment.baseApi;
@Injectable({
  providedIn: 'root'
})
export class StatisticSupplierService {
  api = AUTH_API+"supplier-statistic";
  constructor(private httpClient: HttpClient, private tokenService : TokenStorageService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer `+ this.tokenService.getToken()!,
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }),
  };

  getAll(name:String, page:number, record: number) {
    return  this.httpClient.get(this.api+"/get-all?name="+name+"&page="+page+"&record="+record, this.httpOptions);
  }

}

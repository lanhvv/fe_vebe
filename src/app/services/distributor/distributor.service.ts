import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CreateSupplier} from "../../shared/model/CreateSupplier";
import {Filter} from "../../shared/model/Filter";
import {TokenStorageService} from "../token-storage.service";
const AUTH_API = environment.baseApi;
@Injectable({
  providedIn: 'root'
})
export class DistributorService {
  api = "http://localhost:1507/vibee/api/v1/supplier";
  constructor(private httpClient: HttpClient, private tokenService : TokenStorageService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ` + this.tokenService.getToken()!,
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }),
  };

  display(status:number,nameSearch:string, language:string, filter:Filter, pageNumber:number, size:number){
    return this.httpClient.get(this.api+"/display?nameSearch="+nameSearch+"&language="+language+"&"+filter.typeFilter+"="+filter.valueFilter+"&pageNumber="+pageNumber+"&size="+size+"&status="+status, this.httpOptions);
  }

  pageAndSearch(status: number , numberPage:number, sizePage:number, nameSup:string) {
    return this.httpClient.get(this.api+"?numberPage="+numberPage+"&sizePage="+sizePage+"&nameSup="+nameSup+"&status="+status, this.httpOptions);
  }

  delete(id:number) {
    return this.httpClient.get(this.api+"/delete?id="+id, this.httpOptions);
  }

  save(supplier:CreateSupplier) {
    return this.httpClient.post(this.api+"/create", supplier, this.httpOptions);
  }

  update(supplier:CreateSupplier) {
    return this.httpClient.post(this.api+"/update", supplier, this.httpOptions);
  }
}

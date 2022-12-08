import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
const AUTH_API = environment.baseApi;
@Injectable({
  providedIn: 'root'
})
export class DistributorService {
  api = AUTH_API+"/admin/supplier";
  constructor(private httpClient: HttpClient ) { }

  display(){
    return this.httpClient.get(this.api+"/display");
  }

  pageAndSearch(numberPage:number, sizePage:number, nameSup:string) {
    return this.httpClient.get(this.api+"?numberPage="+numberPage+"&sizePage="+sizePage+"&nameSup="+numberPage);
  }

  delete(id:number) {
    return this.httpClient.get(this.api+"/delete?id="+id);
  }
}

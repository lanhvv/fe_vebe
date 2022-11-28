import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DistributorService {
  api = "http://localhost:8080/vibee/api/v1/admin/supplier";
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

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../../token-storage.service";
import {environment} from "../../../../environments/environment";
const AUTH_API = environment.baseApi;
@Injectable({
  providedIn: 'root'
})
export class ImportOfSupplierService {
  api = AUTH_API+"supplier-statistic/import";
  constructor(private httpClient: HttpClient, private tokenService : TokenStorageService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer `+ this.tokenService.getToken()!,
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }),
  };

  getImportsOfSupplier(idSupplier : number, page : number, row : number, startDate:Date, endDate:Date, productName:string) {
    let link = this.api+"/"+idSupplier+"?&page="+page+"&record="+row+"&nameProduct="+productName;
    if (startDate === undefined && endDate === undefined) {

    } else if (startDate !== undefined && endDate !== undefined) {
      let start = startDate.getFullYear()+"/"+(startDate.getMonth()+1)+"/"+startDate.getDate();
      let end = endDate.getFullYear()+"/"+(endDate.getMonth()+1)+"/"+endDate.getDate();
      link = link+"&startDate="+start+"&endDate="+end;
    } else if (startDate === undefined) {
      let end = endDate.getFullYear()+"/"+(endDate.getMonth()+1)+"/"+endDate.getDate();
      link = link+"&endDate="+end;
    } else if (endDate === undefined) {
      let start = startDate.getFullYear()+"/"+(startDate.getMonth()+1)+"/"+startDate.getDate();
      link = link+"&startDate="+start;
    }
    return  this.httpClient.get(link, this.httpOptions);
  }

  getImportsOfSupplierLineChart(year : number, id : number) {
    return  this.httpClient.get(this.api+"/linechart/"+id+"?&year="+year, this.httpOptions);
  }
}

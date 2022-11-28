import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Filter} from "../../shared/model/Filter";
import {TokenStorageService} from "../token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class StatisticStaffService {
  api = "http://localhost:1507/vibee/api/v1/staff/statistic";
  constructor(private httpClient: HttpClient, private tokenService : TokenStorageService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer `+ this.tokenService.getToken()!,
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }),
  };

  getStatisticStaff(date:string){
    return this.httpClient.get(this.api+"?date=", this.httpOptions);
  }

  getStatisticStaffPageable(numberPage:number, sizePage:number, date:string, filter:Filter){
    if (filter != null) {
      return this.httpClient.get(this.api+"?numberPage="+numberPage+"&sizePage="+sizePage+"&date="+date+"&"+filter.typeFilter+"="+filter.valueFilter, this.httpOptions);
    }
    return this.httpClient.get(this.api+"?numberPage="+numberPage+"&sizePage="+sizePage+"&date="+date, this.httpOptions);
  }

  exportExcel(numberPage:number, sizePage:number, date:string){
    return this.httpClient.get(this.api+"/export?numberPage="+numberPage+"&sizePage="+sizePage+"&date="+date, this.httpOptions);
  }
}

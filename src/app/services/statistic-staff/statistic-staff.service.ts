import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Filter} from "../../shared/model/Filter";

@Injectable({
  providedIn: 'root'
})
export class StatisticStaffService {
  api = "http://localhost:8080/vibee/api/v1/staff/statistic";
  constructor(private httpClient: HttpClient ) { }

  getStatisticStaff(date:string){
    return this.httpClient.get(this.api+"?date="+date);
  }

  getStatisticStaffPageable(numberPage:number, sizePage:number, date:string, filter:Filter){
    if (filter != null) {
      return this.httpClient.get(this.api+"?numberPage="+numberPage+"&sizePage="+sizePage+"&date="+date+"&"+filter.typeFilter+"="+filter.valueFilter);
    }
    return this.httpClient.get(this.api+"?numberPage="+numberPage+"&sizePage="+sizePage+"&date="+date);
  }

  exportExcel(numberPage:number, sizePage:number, date:string){
    return this.httpClient.get(this.api+"-export?numberPage="+numberPage+"&sizePage="+sizePage+"&date="+date);
  }
}

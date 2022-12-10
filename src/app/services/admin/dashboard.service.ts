import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IAdminDashboard} from "../../shared/response/AdminDashboard";
import {TokenStorageService} from "../token-storage.service";


const AUTH_API = environment.baseApi;

@Injectable({
  providedIn: 'root',
})

export class DashboardService{
  api=AUTH_API + "admins/statistic/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer `+ this.tokenService.getToken()!,
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }),
  };



  constructor(private http: HttpClient, private tokenService: TokenStorageService) {}

  reportSumProduct(): any{
    return this.http.get(this.api + 'report-sum-product', this.httpOptions);
  }

  reportTop5Product(lang: string): any{
    return this.http.get(this.api + 'top-5-product' + '?language='+ lang, this.httpOptions);
  }

  reportSumOrder(): any{
    return this.http.get(this.api + 'report-sum-order', this.httpOptions);
  }

  reportLineChart(start: string, end: string): any{
    return this.http.get(this.api + '?startDate='+start + '&endDate='+end, this.httpOptions);
  }

  reportSumPriceOnDay(dateNow: any, lastDate: any): any{
    // return this.http.post(this.api + 'report-sum-price?date=' + dateNow + '&last=' + lastDate, this.httpOptions);
    return null;
  }
}

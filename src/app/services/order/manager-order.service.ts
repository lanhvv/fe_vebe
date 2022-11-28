import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { TokenStorageService } from '../token-storage.service';
import { environment } from 'src/environments/environment.dev';
import { GetOrderRequest } from '../../shared/model/request/getOrderRequest';

@Injectable({
  providedIn: 'root'
})
export class ManagerOrderService {
  readonly URL="http://localhost:1507/vibee/api/v1/admins/order";
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
  //findAllBillByFullName
  getAll(request:GetOrderRequest){
    return this.httpClient.get(this.URL+"/findAllBill?pagenumber="+request.page+"&pagesize="+request.pageSize+
    "&valuefilter="+request.filter.valueFilter+"&typefilter="+request.filter.typeFilter+"&language="+request.language+"&search="+request.searchText, this.httpOptions);

  }
  getAllPhone(request:GetOrderRequest){
    return this.httpClient.get(this.URL+"/findByPhone?pagenumber="+request.page+"&pagesize="+request.pageSize+
    "&valuefilter="+request.filter.valueFilter+"&typefilter="+request.filter.typeFilter+"&language="+request.language+"&search="+request.searchText, this.httpOptions);

  }
  getByIdOrder(request:number){
    return this.httpClient.get(this.URL+"/findById?id="+request, this.httpOptions);

  }
  confirmOrderById(request:number){
    return this.httpClient.post<any>(this.URL+'/confirmBill?id='+request,this.httpOptions);
  }



getPageOrder(pageNum: number):Observable<any>{
  return this.httpClient.get<any>(environment.URL_BASE +this.URL+'?pageIndex='+pageNum);
}
getAll2(page: number, pageSize: number,valueFilter: string, typeFilter: string,language:string, searchText:string): Observable<any> {//&filter=idBill&keyword=1
  return this.httpClient.get(this.URL+"/findAllBill?pagenumber="+page+"&pagesize="+pageSize+
  "&valuefilter="+valueFilter+"&typefilter="+typeFilter+"&language="+language+"&search="+searchText, this.httpOptions);

}
}

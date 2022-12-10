import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GetWarehouseRequest } from 'src/app/shared/model/request/GetWarehouseRequest';
import { TokenStorageService } from '../../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class WarehouseManagerService {
  api="http://localhost:1507/vibee/api/v1/warehouse";
  constructor(private httpClient: HttpClient,private route: Router,private tokenService: TokenStorageService) {

  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer `+ this.tokenService.getToken()!,
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }),
  };

  getAll(request:GetWarehouseRequest){
    return this.httpClient.get(this.api+`/view-manage/${request.productId}?`+'&language='+request.language,this.httpOptions);
  }

  filter(request:GetWarehouseRequest){
    return this.httpClient.get(this.api+`/filter/${request.productId}?pagenumber=`+request.pageItem.page+"&pagesize="+
                                                                                  request.pageItem.pageSize+
                                                                                  '&valuefilter='+request.filter.valueFilter+
                                                                                  '&typefilter='+request.filter.typeFilter+
                                                                                  '&language='+request.language,this.httpOptions);
  }

  delete(request:number){
    return this.httpClient.post(this.api+"/delete",request,this.httpOptions);
  }
}

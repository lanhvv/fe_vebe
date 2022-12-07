import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../token-storage.service";
import {GetProductsRequest} from "../../../shared/model/request/GetProductsRequest";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  api="http://localhost:1507/vibee/api/v1/product";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer `+ this.tokenService.getToken()!,
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }),
  };
  constructor(private httpClient: HttpClient,private route: Router,private tokenService: TokenStorageService) { }

  search(language:string,searchValue:string){
    return this.httpClient.get(this.api+"/view-stall?searchValue="+searchValue+"&language="+language, this.httpOptions);
  }

  selectProduct(language:string,productCode:string,cartId:string){
    return this.httpClient.get(this.api+`/selected/${productCode}/${cartId}?language=`+language, this.httpOptions);
  }

  changeBill(language:string,productCode:string,cartId:string){
    return this.httpClient.post(this.api+`/selected/${productCode}/${cartId}?language=`+language, this.httpOptions);
  }
}

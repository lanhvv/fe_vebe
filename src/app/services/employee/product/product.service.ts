import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../token-storage.service";
import {GetProductsRequest} from "../../../shared/model/request/GetProductsRequest";
import {environment} from "../../../../environments/environment";
const AUTH_API = environment.baseApi;
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  api=AUTH_API+"product/";
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
    return this.httpClient.get(this.api+"view-stall?searchValue="+searchValue+"&language="+language, this.httpOptions);
  }

  getProducts(language:string){
    return this.httpClient.get(this.api+"view-stall?searchValue="+"&language="+language, this.httpOptions);
  }

  selectProduct(language:string,productCode:string,cartId:string){
    return this.httpClient.get(this.api+`selected/${productCode}/${cartId}?language=`+language, this.httpOptions);
  }

  changeBill(language:string,productCode:string,cartId:string){
    return this.httpClient.post(this.api+`selected/${productCode}/${cartId}?language=`+language, this.httpOptions);
  }
  showProduct(){
    return this.httpClient.get(this.api+"show-list-product",this.httpOptions);
  }
  showUnit(id: number, unitId: number){
    return this.httpClient.get(this.api+"getUnitId/"+id +"/"+ unitId, this.httpOptions);
  }
}

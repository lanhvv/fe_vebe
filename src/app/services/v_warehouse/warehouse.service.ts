import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.dev";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {TokenStorageService} from "../token-storage.service";
import {ImportProductResult} from "../../shared/result/product/ImportProductResult";
import {ImportWarehouseResponse} from "../../shared/response/v_warehouse/ImportWarehouseResponse";
const AUTH_API = environment.baseApi;
@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  readonly URL = AUTH_API +"warehouse";
  constructor(private httpClient: HttpClient,private route: Router,private tokenService: TokenStorageService) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer `+ this.tokenService.getToken()!,
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }),
  };

  httpUpload = {
    headers: new HttpHeaders({
      'Authorization':`Bearer `+ this.tokenService.getToken()!,
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }),
  };
  importWarehouse(language: string,supplierCode: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(this.URL+`/import-file?language=${language}&supplierCode=${supplierCode}`,formData,this.httpUpload);
  }

  getWarehouseBySupplier(language: string,supplierCode: number) {
    return this.httpClient.get(this.URL+`/get-warehouse-by-supplier?language=${language}&supplier=${supplierCode}`,this.httpOptions);
  }

  save(language: string, supplierId:number){
    return this.httpClient.post(this.URL+`/save?language=${language}&supplierId=${supplierId}`,null,this.httpOptions);
  }

  saveProductsToRedis(request:ImportWarehouseResponse,language:string){
    return this.httpClient.post(this.URL+"/save-import-products-to-redis?language="+language,request,this.httpOptions);
  }
}

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {TokenStorageService} from "../token-storage.service";
import {UnitRequest} from "../../shared/model/request/UnitRequest";
import {UnitItems} from "../../shared/model/UnitItems";
import {environment} from "../../../environments/environment";
const AUTH_API = environment.baseApi;
@Injectable({
  providedIn: 'root'
})
export class ExportService {
  api=AUTH_API+"catalog";

  apiAdmin = AUTH_API+"export-qr";
  constructor(private client:HttpClient,
              private tokenService: TokenStorageService) {

  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer `+ this.tokenService.getToken()!,
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }),
  };

  export(productCode:string, amount:number, language:string) {
    return this.client.post(this.apiAdmin,{productCode, amount, language}, this.httpOptions);
  }

}


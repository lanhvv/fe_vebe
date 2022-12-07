import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {TokenStorageService} from "../token-storage.service";
import {environment} from "../../../environments/environment.dev";
import {ImportWarehouseResponse} from "../../shared/response/v_warehouse/ImportWarehouseResponse";
import {ImportProductResult} from "../../shared/result/product/ImportProductResult";
const AUTH_API = environment.baseApi;
@Injectable({
  providedIn: 'root'
})
export class ImportService {
  api=AUTH_API+"import";
  constructor(private httpClient: HttpClient,private route: Router,private tokenService: TokenStorageService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer `+ this.tokenService.getToken()!,
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }),
  };


}

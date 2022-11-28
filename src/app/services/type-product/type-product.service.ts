import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class TypeProductService {
  api = "http://localhost:1507/vibee/api/v1/adminsStaff/product/type-product";
  constructor(private httpClient: HttpClient ,private tokenService: TokenStorageService) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer `+ this.tokenService.getToken()!,
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }),
  };

  getAll(){
    return this.httpClient.get(this.api, this.httpOptions);
  }

}

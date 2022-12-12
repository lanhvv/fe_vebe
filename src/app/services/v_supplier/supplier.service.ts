import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {TokenStorageService} from "../token-storage.service";
const AUTH_API = environment.baseApi;
@Injectable({
  providedIn: 'root'
})

export class SupplierService {
  readonly URL = AUTH_API +"supplier";
  constructor(private httpClient: HttpClient,private route: Router,private tokenService: TokenStorageService) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer `+ this.tokenService.getToken()!,
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }),
  };
  getSuppliers(language: string) {
    return this.httpClient.get(this.URL+`/get-all?language=${language}`,this.httpOptions);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../../token-storage.service";
import {environment} from "../../../../environments/environment";
const AUTH_API = environment.baseApi;
@Injectable({
  providedIn: 'root'
})
export class ImportOfSupplierService {
  api = AUTH_API+"supplier-statistic/import";
  constructor(private httpClient: HttpClient, private tokenService : TokenStorageService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer `+ this.tokenService.getToken()!,
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }),
  };

  getImportsOfSupplier(idSupplier : number, page : number, row : number) {
    return  this.httpClient.get(this.api+"/"+idSupplier+"?&page="+page+"&record="+row, this.httpOptions);
  }

}

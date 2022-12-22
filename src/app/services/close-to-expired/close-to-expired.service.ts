import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Filter} from "../../shared/model/Filter";
import {TokenStorageService} from "../token-storage.service";
import {environment} from "../../../environments/environment";
import {EditPriceExportRequest} from "../../shared/model/request/EditPriceExportRequest";
const AUTH_API = environment.baseApi;
@Injectable({
  providedIn: 'root'
})
export class CloseToExpiredService {
  api = AUTH_API+"close-to-expiration";
  constructor(private httpClient: HttpClient, private tokenService : TokenStorageService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer `+ this.tokenService.getToken()!,
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }),
  };

  getAll(nameSearch : string, page:number, row:number) {
    return this.httpClient.get(this.api+"?nameSearch="+nameSearch+"&page="+page+"&record="+row, this.httpOptions);
  }

  editPriceExport(editPriceExportRequest:EditPriceExportRequest) {
    return this.httpClient.post(this.api+"/edit-price-export", editPriceExportRequest, this.httpOptions);
  }
}

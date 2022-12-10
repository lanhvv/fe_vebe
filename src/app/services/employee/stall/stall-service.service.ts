import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../token-storage.service";
import {GetProductsRequest} from "../../../shared/model/request/GetProductsRequest";
const AUTH_API = environment.baseApi+"product";
@Injectable({
  providedIn: 'root'
})
export class StallServiceService {

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
  view(request:GetProductsRequest){
    return this.httpClient.get(AUTH_API+"/view-stall?filter.typeFilter="+request.filter.typeFilter+
      "&filter.valueFilter="+request.filter.valueFilter+"&page.page="+request.page+"&page.pageSize="+request.pageSize+"&language="+request.language, this.httpOptions)
  }
}

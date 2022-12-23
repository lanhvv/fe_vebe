import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {TokenStorageService} from "../token-storage.service";
const AUTH_API = environment.baseApi;
@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  api=AUTH_API+"file";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer `+ this.tokenService.getToken()!,
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      responseType: 'blob'
    }),
  };

  httpOptionsFile = {
    headers: new HttpHeaders({
      'Content-Type': 'application/pdf',
      'Authorization':`Bearer `+ this.tokenService.getToken()!,
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    })
  }
  constructor(private client:HttpClient,
              private tokenService: TokenStorageService) { }

  downloadQrCode(productCode:string, amount:number, language:string) {
    return this.client.get(this.api+`/pdf/download?productCode=${productCode}&amount=${amount}&language=${language}`,{responseType: 'blob'});
  }
}


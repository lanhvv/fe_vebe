import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {ImportInWarehouseRequest} from '../../../shared/model/request/importInWarehouseRequest';
import {ListImportWarehouseInRedis} from '../../../shared/model/response/ListImportWarehouseInRedis';
import {ImportInWarehouseInRedis} from '../../../shared/model/response/ImportInWarehouseInRedis';
import {TokenStorageService} from "../../token-storage.service";

const AUTH_API = environment.baseApi;

@Injectable({
  providedIn: 'root'
})
export class ImportSupplierService {
  readonly URL = AUTH_API+"import-warehouse";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer `+ this.tokenService.getToken()!,
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }),
  };
  constructor(private httpClient: HttpClient, private tokenService: TokenStorageService ) { }

  getAllUnit(language:string) {
    return this.httpClient.get<any>(this.URL+'/unit?language='+language, this.httpOptions)
  }

  getAllType() {
    return this.httpClient.get<any>(this.URL + '/type-product', this.httpOptions)
  }

  getAllSupplier() {
    return this.httpClient.get<any>(this.URL + '/supplier', this.httpOptions)
  }

  getAllSupplierName(id: number) {
    return this.httpClient.get<any>(this.URL + '/supplier/name?id=' + id, this.httpOptions)
  }

  getUnitByIdParent(id: number, language: string) {
    return this.httpClient.get<any>(this.URL + '/unit/' + id + '?language=' + language, this.httpOptions)
  }

  getProductByBarcode(barcode: string, language: string) {
    return this.httpClient.get<any>(this.URL + '/barcode-product/' + barcode + '?language=' + language, this.httpOptions)
  }

  createImportWarehouse(request: ImportInWarehouseRequest) {
    return this.httpClient.post(this.URL + "/create-importWarehouse", request, this.httpOptions);
  }

  findByUnitId(parent:any, language:string){
    return this.httpClient.get<any>(this.URL+'/unitId-parent/'+parent+'?language='+language, this.httpOptions)
  }

  getImportInWarehouse(id: any) {
    return this.httpClient.get<any>(this.URL + '/getAllRedis-importWarehouse/' + id, this.httpOptions)
  }

  add(request: ImportInWarehouseInRedis[]) {
    return this.httpClient.post(this.URL + '/done-import', request, this.httpOptions)
  }

  deleteById(key: number, redisId: string, language: string) {
    return this.httpClient.get<any>(this.URL + '/deleteById-importWarehouse/' + key + '/' + redisId + '?language=' + language, this.httpOptions)
  }

  edit(key: number, redisId: string, language: string) {
    return this.httpClient.get<any>(this.URL + '/edit-import/' + key + '/' + redisId + '?language=' + language, this.httpOptions)
  }

  deleteAll(key: number, language: string) {
    return this.httpClient.get<any>(this.URL + '/deleteAll-importWarehouse/' + key + '?language=' + language, this.httpOptions)
  }

  update(request: ImportInWarehouseRequest, key: number, redisId: string) {
    return this.httpClient.post(this.URL + "/update-import/" + key + '/' + redisId, request, this.httpOptions);
  }
}

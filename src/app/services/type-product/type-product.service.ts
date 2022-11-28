import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from '../../../environments/environment';
import {TokenStorageService} from "../token-storage.service";
import {TreeNode} from "primeng/api";
import {Observable} from "rxjs";
import {CreateTypeProductRequest} from "../../shared/model/request/createTypeProductRequest";
import {DeleteTypeProductRequest} from "../../shared/model/request/deleteTypeProductRequest";
import {EditAccountRequest} from "../../shared/model/request/editAccountRequest";
import {UpdateTypeProductRequest} from "../../shared/model/request/updateTypeProductRequest";
import {GetOrderRequest} from "../../shared/model/request/getOrderRequest";
import {CreateTypeProductDetailRequest} from "../../shared/model/request/createTypeProductDetailRequest";
const AUTH_API = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TypeProductService {
  api = "http://localhost:1507//vibee/api/v1/auth/";
  readonly URL = AUTH_API+"vibee/api/v1/auth";
  readonly URLSELECTION = AUTH_API+"vibee/api/v1/getAllSelectType";
  deleteTypeProductRequest!: DeleteTypeProductRequest;
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
    return this.httpClient.get(this.api, this.httpOptions)
  }

  getFilesystem() {
    return this.httpClient.get<any>(this.URL+'getAllSelectType', this.httpOptions)
  }

  getAllTypeProduct(request:GetOrderRequest){
    return this.httpClient.get(this.URL+"getAllType1?pagenumber="+request.page+"&pagesize="+request.pageSize+
      "&valuefilter="+request.filter.valueFilter+"&typefilter="+request.filter.typeFilter+"&language="+request.language+"&search="+request.searchText, this.httpOptions);
  }
  create(request: CreateTypeProductRequest): Observable<any>{
    return this.httpClient.post<any>(this.URL+'createTyProduct', request,this.httpOptions);
  }
  delete(request: number): Observable<any>{
    this.deleteTypeProductRequest=new DeleteTypeProductRequest();
    this.deleteTypeProductRequest.id=request;
    return this.httpClient.post<any>(this.URL+'deleteType', this.deleteTypeProductRequest,this.httpOptions);
  }
  update(request: UpdateTypeProductRequest): Observable<any>{
    return this.httpClient.post<any>(this.URL+'updateType', request,this.httpOptions);
  }
  edit(request: number):Observable<any> {
    return this.httpClient.get(this.URL+'editType/'+request,this.httpOptions);
  }
  //getDetailParentById
  detailTypeProductById(request: number):Observable<any> {
    return this.httpClient.get(this.URL+'getDetailParentById/'+request,this.httpOptions);
  }
  createDetail(request: CreateTypeProductDetailRequest): Observable<any>{
    return this.httpClient.post<any>(this.URL+'createTyProductDetail', request,this.httpOptions);
  }
}

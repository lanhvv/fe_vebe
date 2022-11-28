import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductItem } from 'src/app/shared/model/ProductItem';
import { FilterRequest } from 'src/app/shared/model/request/FilterRequest';
import { GetProductsRequest } from 'src/app/shared/model/request/GetProductsRequest';
import { GetProductsResponse } from 'src/app/shared/model/response/GetProductsResponse';
import { Observable, of } from 'rxjs';
import { CreateProductRequest } from 'src/app/shared/model/request/CreateProductRequest';
import { CreateProductResponse } from 'src/app/shared/model/response/CreateProductResponse';
import { Router } from '@angular/router';
import { LockRequest } from 'src/app/shared/model/request/lockRequest';
import {TokenStorageService} from "../token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  api="http://localhost:1507/vibee/api/v1/admins/product";
  message="";
  constructor(private httpClient: HttpClient,private route: Router, private tokenService: TokenStorageService) {

  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer `+ this.tokenService.getToken()!,
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }),
  };
  getProductsResponse!:GetProductsResponse;
  productItems:ProductItem[]=[];
  createResponse!:CreateProductResponse;
  lockRequest!:LockRequest;

  getAll(request:GetProductsRequest){
    return this.httpClient.get(this.api+"/getall?pagenumber="+request.page+"&pagesize="+request.pageSize+
      "&valuefilter="+request.filter.valueFilter+"&typefilter="+request.filter.typeFilter+"&language="+request.language+"&search="+request.searchText, this.httpOptions);
  }

  getAlls(request:GetProductsRequest): Observable<GetProductsResponse> {
    const url=this.api+"/getall?pagenumber="+request.page+"&pagesize="+request.pageSize+
      "&valuefilter="+request.filter.valueFilter+"&typefilter="+request.filter.typeFilter+"&language="+request.language;
    // @ts-ignore
    return this.httpClient.get<GetProductsResponse>(url);
  }

  getAllProduct(request:GetProductsRequest){
    this.getAll(request).subscribe((response)=>{
      this.getProductsResponse=response as GetProductsResponse;
      this.productItems=this.getProductsResponse.items;
      console.log(this.productItems);
    });
    console.log(this.productItems);
    return this.getProductsResponse;
  }


  filter(request:FilterRequest){
    return this.httpClient.post(this.api+"/filter",request);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  create(request:CreateProductRequest){
    return this.httpClient.post(this.api+"/create",request);
  }

  public getProducts(): any {
    const productsObservable = new Observable(observer => {
      setTimeout(() => {
        observer.next(this.getProductsResponse);
      }, 1000);
    });

    return productsObservable;
  }

  getConfig(request:GetProductsRequest) {
    return this.httpClient.get<GetProductsResponse>(this.api+"/getall?pagenumber="+request.page+"&pagesize="+request.pageSize+
      "&valuefilter="+request.filter.valueFilter+"&typefilter="+request.filter.typeFilter+"&language="+request.language);
  }

  lock(request:number){
    this.lockRequest=new LockRequest();
    this.lockRequest.productId=request;
    this.lockRequest.language="vi";
    return this.httpClient.post(this.api+"/lock/",this.lockRequest, this.httpOptions);
  }

  delete(request:number){
    this.lockRequest=new LockRequest();
    this.lockRequest.productId=request;
    this.lockRequest.language="vi";
    return this.httpClient.post(this.api+"/delete",this.lockRequest, this.httpOptions);
  }

  unLock(request:number){
    this.lockRequest=new LockRequest();
    this.lockRequest.productId=request;
    this.lockRequest.language="vi";
    return this.httpClient.post(this.api+"/unlock",this.lockRequest, this.httpOptions);
  }

  getInforCreateProduct(){
    return this.httpClient.get(this.api+"/create/info?language=vi");
  }

  apiStaff = "http://localhost:1507/vibee/api/v1/adminsStaff/product";
  getAllProductStaff(){
    return this.httpClient.get(this.apiStaff);
  }

  getProduct(type:number, price:number, nameProduct:string,page:number){
    return this.httpClient.get(this.apiStaff+"/get-product-by-type?type="+type+"&price="+price+"&nameProduct="+nameProduct+"&numberPage="+page, this.httpOptions);
  }

}

import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
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
import { UpdateProductRequest } from 'src/app/shared/model/request/UpdateProductRequest';
import {TokenStorageService} from "../../token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // api="http://localhost:8080/vibee/api/v1/admins/product";
  api="http://localhost:1507/vibee/api/v1/product";

  message="";
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
  httpUpload = {
    headers: new HttpHeaders({
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
    console.log(this.tokenService.getToken());
    return this.httpClient.get(this.api+"/view-manage?pagenumber="+request.page+"&pagesize="+request.pageSize+
      "&valuefilter="+request.filter.valueFilter+"&typefilter="+request.filter.typeFilter+"&language="+request.language+"&search="+request.searchText, this.httpOptions);
  }

  getAlls(request:GetProductsRequest): Observable<GetProductsResponse> {
    const url=this.api+"/getall?pagenumber="+request.page+"&pagesize="+request.pageSize+
      "&valuefilter="+request.filter.valueFilter+"&typefilter="+request.filter.typeFilter+"&language="+request.language;
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
    return this.httpClient.post(this.api+"/filter",request,this.httpOptions);
  }

  create(request:CreateProductRequest){
    return this.httpClient.post(this.api+"/create",request,this.httpOptions);
  }

  pushFileToStorage(file: File,language:string){
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(this.api+`/create/upload?language=`+language,formData,this.httpUpload);
  }


  updateImage(file: File,idProduct:number){
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(this.api+`/update/upload/${idProduct}?language=vi`,formData,this.httpUpload);
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
      "&valuefilter="+request.filter.valueFilter+"&typefilter="+request.filter.typeFilter+"&language="+request.language,this.httpOptions);
  }

  lock(request:number){
    this.lockRequest=new LockRequest();
    this.lockRequest.productId=request;
    this.lockRequest.language="vi";
    return this.httpClient.post(this.api+"/lock/",this.lockRequest,this.httpOptions);
  }

  delete(request:number){
    this.lockRequest=new LockRequest();
    this.lockRequest.productId=request;
    this.lockRequest.language="vi";
    return this.httpClient.post(this.api+"/delete",this.lockRequest,this.httpOptions);
  }

  unLock(request:number){
    this.lockRequest=new LockRequest();
    this.lockRequest.productId=request;
    this.lockRequest.language="vi";
    return this.httpClient.post(this.api+"/unlock",this.lockRequest,this.httpOptions);
  }

  getInforCreateProduct(){
    return this.httpClient.get(this.api+"/create/info?language=vi",this.httpOptions);
  }

  detail(id:number,language:string){
    return this.httpClient.get(this.api+`/detail/${id}?language=`+language,this.httpOptions);
  }

  infoUpdate(id:number,language:string){
    return this.httpClient.get(this.api+`/update/info/${id}?language=`+language,this.httpOptions);
  }

  update(request:UpdateProductRequest){
    return this.httpClient.post(this.api+`/update`,request,this.httpOptions);
  }
}

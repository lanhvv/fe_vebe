import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ImportInWarehouseRequest } from '../../../shared/model/request/importInWarehouseRequest';
import { ListImportWarehouseInRedis } from '../../../shared/model/response/ListImportWarehouseInRedis';
import { ImportInWarehouseInRedis } from '../../../shared/model/response/ImportInWarehouseInRedis';
const AUTH_API = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ImportSupplierService {
  readonly URL = AUTH_API+"vibee/api/v1/auth";
  constructor(private httpClient: HttpClient ) { }
  getAllUnit(language:string) {
    return this.httpClient.get<any>(this.URL+'/unit?language='+language)
  }
  getAllType() {
    return this.httpClient.get<any>(this.URL+'/type-product')
  }
  getAllSupplier(){
    return this.httpClient.get<any>(this.URL+'/supplier')
  }
  getAllSupplierName(id:number){
    return this.httpClient.get<any>(this.URL+'/supplier/name?id='+id)
  }
  getUnitByIdParent(id:number,language:string){
    return this.httpClient.get<any>(this.URL+'/unit/'+id+'?language='+language)
  }
  getProductByBarcode(barcode:string,language:string ){
    return this.httpClient.get<any>(this.URL+'/barcode-product/'+barcode+'?language='+language)
  }
  createImportWarehouse(request:ImportInWarehouseRequest){
    return this.httpClient.post(this.URL+"/create-importWarehouse",request);
  }
  findByUnitId(id:any){
    return this.httpClient.get<any>(this.URL+'/findByUnitId/'+id)
  }
  getImportInWarehouse(id: any){
    return this.httpClient.get<any>(this.URL+'/getAllRedis-importWarehouse/'+id)
  }
  add(request:ImportInWarehouseInRedis[]){
    return this.httpClient.post(this.URL+'/done-import', request)
  }
  deleteById(key: number, redisId: string, language:string){
    return this.httpClient.get<any>(this.URL+'/deleteById-importWarehouse/'+key+'/'+redisId+'?language='+language)
  }
  edit(key: number, redisId: string, language:string){
    return this.httpClient.get<any>(this.URL+'/edit-import/'+key+'/'+redisId+'?language='+language)
  }
  deleteAll(key: number, redisId: string, language:string){
    return this.httpClient.get<any>(this.URL+'/deleteAll-importWarehouse/'+key+'?language='+language)
  }
  update(request:ImportInWarehouseRequest, key: number,redisId: string ){
    return this.httpClient.post(this.URL+"/update-import/"+key+'/'+redisId,request);
  }
}

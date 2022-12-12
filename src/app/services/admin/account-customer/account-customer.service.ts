import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {TokenStorageService} from "../../token-storage.service";
import {Filter} from "../../../shared/model/Filter";
import {CustomerRequest} from "../../../shared/model/request/CustomerRequest";
import {environment} from "../../../../environments/environment";
// import {TokenStorageService} from "../token-storage.service";
// import {UnitItems} from "../../shared/model/UnitItems";
// import {UnitRequest} from "../../shared/model/request/UnitRequest";
// import {AccountCustomerItem} from "../../shared/model/AccountCustomerItem";
// import {CustomerRequest} from "../../shared/model/request/CustomerRequest";
// import {Filter} from "../../shared/model/Filter";
const AUTH_API = environment.baseApi;
@Injectable({
  providedIn: 'root'
})
export class AccountCustomerService {
  apiAdmin = AUTH_API+"/admins/customers"

  constructor(private client:HttpClient,
              private tokenService: TokenStorageService) {

  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer `+ this.tokenService.getToken()!,
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }),
  };

  getCustomers() {
    return this.client.get(this.apiAdmin, this.httpOptions);
  }

  getCustomer(page:number, size:number, search:string, filter:Filter, status:number) {
    if (filter !== null) {
      return this.client.get(this.apiAdmin+"?pageNumber="+page+"&size="+size+"&search="+search +"&status="+status+"&"+filter.typeFilter+"="+filter.valueFilter, this.httpOptions);
    } else {
      console.log("jejejej");
      return this.client.get(this.apiAdmin+"?pageNumber="+page+"&size="+size+"&status="+status+"&search="+search, this.httpOptions);
    }
  }

  save(customer : CustomerRequest) {
    return this.client.post(this.apiAdmin, customer, this.httpOptions);
  }

  lockAndUnlock(id:number) {
    return this.client.delete(this.apiAdmin+"/"+id, this.httpOptions);
  }
}

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {TokenStorageService} from "../token-storage.service";
import {UnitRequest} from "../../shared/model/request/UnitRequest";
import {UnitItems} from "../../shared/model/UnitItems";
import {environment} from "../../../environments/environment";
const AUTH_API = environment.baseApiAdmin;
@Injectable({
  providedIn: 'root'
})
export class UnitService {
  api=AUTH_API+"vibee/api/v1/catalog";

  apiAdmin = AUTH_API+"/unit";
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


  getChild(id:number,language:string){
    return this.client.get(this.api+`/unit/getchild/${id}?language=${language}`);
  }

  getUnit(nameSearch:string, page:number, record:number) {
    return this.client.get(this.apiAdmin+"?nameSearch="+nameSearch+"&page="+page+"&record="+record);
  }

  save(unit : UnitRequest) {
    return this.client.post(this.apiAdmin, unit);
  }

  update(unit : UnitRequest) {
    return this.client.put(this.apiAdmin, unit);
  }

  delete(id:number) {
    return this.client.delete(this.apiAdmin+"/"+id);
  }

  requestUnit : RequestUnit = new RequestUnit();
  deleteParentIdEqual0(idDelete:number, idParent:number, list:UnitItems[]) {
    this.requestUnit.idDelete = idDelete;
    this.requestUnit.idParent = idParent;
    let listUnitEdit : UnitItemEdit[] = [];
    for (let i=0; i < list.length; i++) {
      let item : UnitItems = list[i];
      let unitItemEdit = new UnitItemEdit();
      unitItemEdit.id = item.id;
      unitItemEdit.amount = item.amount;
      listUnitEdit.push(unitItemEdit);
    }
    this.requestUnit.listEdit = listUnitEdit;
    console.log(this.requestUnit);
    return this.client.post(this.apiAdmin+"/delete", this.requestUnit);
  }

  getUnits(language:string){
    return this.client.get(this.api+`/unit/get-all?language=${language}`);
  }

  getUnitsByUnitSelected(language:string, id:number){
    return this.client.get(this.api+`/unit/get-units-by-select-unit?language=${language}&id=${id}`,this.httpOptions);
  }
}

export class UnitItemEdit {
  id !: number;
  amount !: number;
}


// @ts-ignore
export class RequestUnit {
  idDelete!:number;
  idParent!:number;
  listEdit!:UnitItemEdit[];
}

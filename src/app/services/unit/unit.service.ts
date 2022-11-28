import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  api="http://localhost:1507/vibee/api/v1/catalog"
  constructor(private client:HttpClient) {

  }
  getChild(id:number,language:string){
    return this.client.get(this.api+`/unit/getchild/${id}?language=${language}`);
  }
}

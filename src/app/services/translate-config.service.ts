import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {
  value!: string;
  constructor(private translateService: TranslateService) {
    this.translateService.use('vi');
  }

  changeLanguage(type: string){
    this.translateService.use(type);
  }

  getLanguage(){
    return this.translateService.getBrowserLang();
  }

  getvalue(key: string){
     this.translateService.get(key).subscribe(response=>{
       this.value = response as string;
    });
    return this.value;
  }
}

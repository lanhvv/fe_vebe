import { Component, OnInit } from '@angular/core';
import { Filter } from 'src/app/shared/model/Filter';
import { GetProductsRequest } from 'src/app/shared/model/request/GetProductsRequest';
import { GetProductsResponse } from 'src/app/shared/model/response/GetProductsResponse';
import { ProductItem } from 'src/app/shared/model/ProductItem';
import { LockResponse } from 'src/app/shared/model/response/LockResponse';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import {ProductService} from "../../../services/admin/product/product.service";

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css'],
  providers: [MessageService]
})
export class ManageProductComponent implements OnInit {
  status: number | undefined;

  getProductsResponse:GetProductsResponse;
  getProductsResponses!:GetProductsResponse[];
  getProductsRequest!:GetProductsRequest;
  response: any =[];
  productsItems:ProductItem[]=[];
  productsResponse!:ProductItem[];
  productsRes!:ProductItem[];
  productsItem!:ProductItem;
  filter!:Filter;
  page=0;
  pageSize=10;
  products = [];
  lockeResponse!:LockResponse;
  searchText="";
  inventory="product.search";
  deleteId=0;
  unlockId=0;
  lockId=0;
  language!:string;
  yes='layout.button.confirm.yes';
  no='layout.button.confirm.no';
  constructor(
     private prodService:ProductService,
              private tokenStorageService:TokenStorageService,
              private router:Router,
              private messageService: MessageService,
              private translateService:TranslateConfigService) {
    this.getProductsResponse=new GetProductsResponse();
   }


  ngOnInit(): void {
    this.language=this.translateService.getLanguage()!;
    this.getall();
    this.status = 6;
  }

  sort(nameFilter:string){
    if(nameFilter==this.filter.typeFilter){
      if(this.filter.valueFilter=="asc"){
        this.filter.valueFilter="desc";
      }else{
        this.filter.valueFilter="asc";
      }
    }else{
      this.filter.valueFilter="asc";
      this.filter.typeFilter=nameFilter;
    }

    this.getProductsRequest={"page":this.page,"pageSize":this.pageSize,"filter":this.filter,"language":this.language,searchText:this.searchText};
    this.prodService.getAll(this.getProductsRequest).subscribe(response => {
      this.getProductsResponse=response as GetProductsResponse;
    });
  }

  Pageable(request:any){
    this.page=request.page;
    this.pageSize=request.rows;
    this.getProductsRequest={"page":this.page,"pageSize":this.pageSize,"filter":this.filter,"language":this.language,searchText:this.searchText};
    this.prodService.getAll(this.getProductsRequest).subscribe(response => {
      this.getProductsResponse=response as GetProductsResponse;
    });
  }

  getall(){
    this.filter={"typeFilter":"none","valueFilter":"none"}
    this.getProductsRequest={"page":this.page,"pageSize":this.pageSize,"filter":this.filter,"language":this.language,searchText:this.searchText};
    this.prodService.getAll(this.getProductsRequest).subscribe((response) => {
      this.getProductsResponse=response as GetProductsResponse;
    });
    console.log(this.tokenStorageService.getToken());
  }

  searchNameProd(request: string){
    this.searchText=request;
    this.getProductsRequest={"page":this.page,"pageSize":this.pageSize,"filter":this.filter,"language":this.language,searchText:this.searchText};
    this.prodService.getAll(this.getProductsRequest).subscribe(response => {
      this.getProductsResponse=response as GetProductsResponse;
    });
    console.log(request);
  }

  update(id:number){
    this.router.navigate(['/admin/update-product',id])  ;
  }

  create(){
    this.router.navigate(['/admin/detail-product'])
  }

  onReject(){
    this.deleteId=0;
    this.lockId=0;
    this.unlockId=0;
    this.messageService.clear('remove');
    this.messageService.clear('lock');
    this.messageService.clear('unlock');
  }

  delete(){
    this.prodService.delete(this.deleteId).subscribe(response => {
      this.lockeResponse=response as LockResponse;
      if(this.lockeResponse.status.status=== '1'){
        for(let i=0;i<this.getProductsResponse.items.length;i++){
          if(this.getProductsResponse.items[i].productCode===this.lockeResponse.item.productCode){
            this.getProductsResponse.items[i].statusCode=this.lockeResponse.item.statusCode;
            this.getProductsResponse.items[i].statusName=this.lockeResponse.item.statusName;
          }
        }
        this.success(this.lockeResponse.status.message);
        this.messageService.clear('remove');
      }else{
       this.failed(this.lockeResponse.status.message);
        this.messageService.clear('remove');
      }
    });
  }

  lock(){
    this.prodService.lock(this.lockId).subscribe(response => {
      this.lockeResponse=response as LockResponse;
      if(this.lockeResponse.status.status=== '1'){
        for(let i=0;i<this.getProductsResponse.items.length;i++){
          if(this.getProductsResponse.items[i].productCode===this.lockeResponse.item.productCode){
            this.getProductsResponse.items[i].statusCode=this.lockeResponse.item.statusCode;
            this.getProductsResponse.items[i].statusName=this.lockeResponse.item.statusName;
          }
        }
       this.success(this.lockeResponse.status.message);
        this.messageService.clear('lock');
      }else{
       this.failed(this.lockeResponse.status.message);
        this.messageService.clear('lock');
      }
    });
  }

  unlock(){
    this.prodService.unLock(this.unlockId).subscribe(response => {
      this.lockeResponse=response as LockResponse;
      if(this.lockeResponse.status.status=== '1'){
        for(let i=0;i<this.getProductsResponse.items.length;i++){
          if(this.getProductsResponse.items[i].productCode===this.lockeResponse.item.productCode){
            this.getProductsResponse.items[i].statusCode=this.lockeResponse.item.statusCode;
            this.getProductsResponse.items[i].statusName=this.lockeResponse.item.statusName;
          }
        }
       this.success(this.lockeResponse.status.message);
        this.messageService.clear('unlock');
      }else{
       this.failed(this.lockeResponse.status.message);
        this.messageService.clear('unlock');
      }
    });
  }

  confirmRemove(request:number) {
    this.messageService.clear();
    this.deleteId=request;
    this.messageService.add({key: 'remove', sticky: true, severity:'warn', summary:this.translateService.getvalue("layout.button.confirm.title.delete"), detail:this.translateService.getvalue("layout.button.confirm.content.delete")});
}

confirmLock(request:number) {
  this.messageService.clear();
  this.lockId=request;
  this.messageService.add({key: 'lock', sticky: true, severity:'warn', summary:this.translateService.getvalue("layout.button.confirm.title.lock"), detail:this.translateService.getvalue("layout.button.confirm.content.delete")});
}

confirmUnlock(request:number) {
  this.messageService.clear();
  this.unlockId=request;
  this.messageService.add({key: 'unlock', sticky: true, severity:'warn', summary:this.translateService.getvalue("layout.button.confirm.title.unlock"), detail:this.translateService.getvalue("layout.button.confirm.content.delete")});
}

success(message: string) {
  this.messageService.add({severity:'success', summary: this.translateService.getvalue("message.success"), detail: message});
}

failed(message: string) {
  this.messageService.add({severity:'error', summary: this.translateService.getvalue("message.failed"), detail: message});
}
}

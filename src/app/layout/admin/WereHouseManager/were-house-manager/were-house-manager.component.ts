import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { WarehouseManagerService } from 'src/app/services/admin/Warehouse/warehouse-manager.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { Filter } from 'src/app/shared/model/Filter';
import { GetLastImportItem } from 'src/app/shared/model/GetLastImportItem';
import { GetWarehouseItem } from 'src/app/shared/model/GetWarehouseItem';
import { PageItem } from 'src/app/shared/model/PageItem';
import { GetWarehouseRequest } from 'src/app/shared/model/request/GetWarehouseRequest';
import { DeleteWarehouseResponse } from 'src/app/shared/model/response/DeleteWarehouseResponse';
import { GetProductResult } from 'src/app/shared/model/response/GetProductResult';
import { GetWarehouseResponse } from 'src/app/shared/model/response/GetWarehouseResponse';

@Component({
  selector: 'app-were-house-manager',
  templateUrl: './were-house-manager.component.html',
  styleUrls: ['./were-house-manager.component.css'],
  providers: [MessageService]
})
export class WereHouseManagerComponent implements OnInit {
  id!:number;
  basicData: any;
  basicOptions: any;
  getWarehouseResponse:GetWarehouseResponse;
  filter!:Filter;
  getWarehouseRequest!:GetWarehouseRequest;
  pageItem!:PageItem;
  labelItems:string[]=[];
  inAmountItems:number[]=[];
  outAmountItems:number[]=[];
  language!:string;
  retio=0;
  deleteWarehouseResponse!:DeleteWarehouseResponse;
  constructor(private router:ActivatedRoute,
                              private route:Router,
                              private warehouseManagerService:WarehouseManagerService,
                              private messageService: MessageService,
                              private translateService:TranslateConfigService) {
    this.getWarehouseResponse=new GetWarehouseResponse();
    this.getWarehouseResponse.getProductResult=new GetProductResult();
    this.getWarehouseResponse.getLastImportItem=new GetLastImportItem();
    this.pageItem=new PageItem();
  }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.language=this.translateService.getLanguage()!;
    this.getall();

    console.log(this.translateService.getvalue("message.success"))
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

    this.getWarehouseRequest={"productId":this.id,"pageItem":this.pageItem,"filter":this.filter,"language":this.language};
    this.warehouseManagerService.filter(this.getWarehouseRequest).subscribe(response => {
      this.getWarehouseResponse=response as GetWarehouseResponse;
      if(this.getWarehouseResponse.status.status=== '1'){
        for(var item of this.getWarehouseResponse.getWarehouseItems){
          this.labelItems.push(item.createdDate);
          this.inAmountItems.push(item.inAmount);
          this.outAmountItems.push(item.outAmount);
        }
      }else{
        alert(this.getWarehouseResponse.status.message);
      }
    });
  }
  //
  chart(){
    this.basicData = {
      labels: this.labelItems,
      datasets: [
          {
              label: "số lượng nhập",
              data: this.inAmountItems,
              fill: false,
              borderColor: '#42A5F5',
              tension: .4
          },
          {
              label: "số lượng bán",
              data: this.outAmountItems,
              fill: false,
              borderColor: '#FFA726',
              tension: .4
          }
      ]
  };
  }

  getall(){
    this.filter={"typeFilter":"none","valueFilter":"none"}
    this.pageItem={"totalItems":0,"totalPages":0,"page":0,"pageSize":10};
    this.getWarehouseRequest={"productId":this.id,"pageItem":this.pageItem,"filter":this.filter,"language":this.language};
    this.warehouseManagerService.getAll(this.getWarehouseRequest).subscribe((response) => {
      this.getWarehouseResponse=response as GetWarehouseResponse;
      if(this.getWarehouseResponse.status.status=== '1'){
        for(var item of this.getWarehouseResponse.getCharWareHouseItems){
          this.labelItems.push(item.createDate);
          this.inAmountItems.push(item.inAmount);
          this.outAmountItems.push(item.outAmount);
        }
        this.basicData = {
          labels: this.labelItems,
          datasets: [
              {
                  label: "số lượng nhập",
                  data: this.inAmountItems,
                  fill: false,
                  borderColor: '#42A5F5',
                  tension: .4
              },
              {
                  label: "số lượng bán",
                  data: this.outAmountItems,
                  fill: false,
                  borderColor: '#FFA726',
                  tension: .4
              }
          ]
      };
      this.retio=this.getWarehouseResponse.getLastImportItem.outAmount/this.getWarehouseResponse.getLastImportItem.inAmount
      console.log(this.retio);
      }else{
        alert(this.getWarehouseResponse.status.message);
      }
    });
  }

  update(id:number){
    this.route.navigate(['/admin/update-product',id])  ;
  }

  deleteProd(request:number){
    const check=confirm("do you want to delete this product?");
    if(check){
    this.warehouseManagerService.delete(request).subscribe(response => {
      this.deleteWarehouseResponse=response as DeleteWarehouseResponse;
      if(this.deleteWarehouseResponse.status.status=== '0'){
        for(let i=0;i<this.getWarehouseResponse.getWarehouseItems.length;i++){
          if(this.getWarehouseResponse.getWarehouseItems[i].warehouseId===this.deleteWarehouseResponse.warehouseId){
            this.getWarehouseResponse.getWarehouseItems[i].statusName=this.deleteWarehouseResponse.statusName;
            this.getWarehouseResponse.getWarehouseItems[i].statusCode=this.deleteWarehouseResponse.statusCode;
          }
        }
        this.success(this.deleteWarehouseResponse.status.message)
      }else{
        alert(this.deleteWarehouseResponse.status.message);
        this.failed(this.deleteWarehouseResponse.status.message)
      }
    });
  }
  }

  success(message: string) {
    this.messageService.add({severity:'success', summary: this.translateService.getvalue("message.success"), detail: message});
  }

  failed(message: string) {
    this.messageService.add({severity:'error', summary: this.translateService.getvalue("message.failed"), detail: message});
  }
}

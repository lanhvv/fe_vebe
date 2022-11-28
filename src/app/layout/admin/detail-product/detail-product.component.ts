import { Component, OnInit} from '@angular/core';
import {Category} from "../../../shared/model/category.model";
// @ts-ignore
import {DropdownFilterOptions} from 'primeng/dropdown';
import { GetInfoCreateProdResponse } from 'src/app/shared/model/response/GetInfoCreateProdResponse';
import { CreateProductResponse } from 'src/app/shared/model/response/CreateProductResponse';
import { CreateProductRequest } from 'src/app/shared/model/request/CreateProductRequest';
import { GetSupplierItem } from 'src/app/shared/model/response/GetSupplieritem';
import { Unit } from 'src/app/shared/model/Unit';
import { InfoUnitItem } from 'src/app/shared/model/InfoUnitItem';
import { UnitService } from 'src/app/services/unit/unit.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { GetUnitChildResponse } from 'src/app/shared/model/response/GetUnitChildResponse';
import { MessageService } from 'primeng/api';
import {ProductService} from "../../../services/admin/product/product.service";

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
  providers: [MessageService]
})
export class DetailProductComponent implements OnInit {
  getInforCreateProductResponse!:GetInfoCreateProdResponse;
  selectedCategory: Category =new Category();
  filterValue = '';
  selectedSupplier: GetSupplierItem=new GetSupplierItem();
  selectedUnitParent: InfoUnitItem=new InfoUnitItem();
  selectedUnitChilds: InfoUnitItem[]=[];
  uploadedFiles: any[] = [];
  createProductRequest:CreateProductRequest;
  createProductResponse!:CreateProductResponse;
  unitLayouts:any[]=[];
  unitLayout!:any;
  unit!:Unit;
  image!:any;
  img!:File;
  language!:string;
  getUnitChileResponse!:GetUnitChildResponse;
  fileId=0;
  constructor(
    private prodService:ProductService,
              private unitService:UnitService,
              private messageService: MessageService,
              private translateService:TranslateConfigService) {
    this.createProductRequest=new CreateProductRequest();
  }

  ngOnInit(): void {
    this.language=this.translateService.getLanguage()!;
    this.getInformations();
    this.getUnitLayouts();
  }

  myResetFunction(options: DropdownFilterOptions) {
    options.reset?.();
    this.filterValue = '';
  }

  create(){
    if(this.selectedCategory!=null){
    this.createProductRequest.categoryId=this.selectedCategory.id as number;
    }
    if(this.selectedSupplier!=null){
      this.createProductRequest.supplierId=this.selectedSupplier.id as number;
    }
    if(this.selectedUnitParent!=null){
      this.createProductRequest.unitId=this.selectedUnitParent.unitId as number;
      this.createProductRequest.unit=this.selectedUnitParent.unitName as string;
    }
    this.createProductRequest.fileId=this.fileId;
    this.prodService.create(this.createProductRequest).subscribe(response => {
      this.createProductResponse = response as CreateProductResponse;
      if(this.createProductResponse.status.status=== '1'){
        this.success(this.createProductResponse.status.message);
      }else{
        this.failed(this.createProductResponse.status.message);
      }
    });
  }

  back(){
    window.history.back();
  }

  getInformations(){
    this.prodService.getInforCreateProduct().subscribe(response => {
      this.getInforCreateProductResponse = response as GetInfoCreateProdResponse;
      console.log(this.getInforCreateProductResponse.unitItems);
    });
  }


getUnitLayouts(){
  this.unitLayout=1;
  this.unitLayouts.push(1);
}

createUnitLayout(){
  this.unitLayout=this.unitLayouts.length+1;
  this.unitLayouts.push(this.unitLayout);
  this.unit=this.unit={"unitName":"","inPrice":0,"outPrice":0,"parentId":0,"unitId":0};
  this.createProductRequest.units.push(this.unit);
}

deleteUnitLayout(index:number){
  this.unitLayouts.splice(index,1);
  this.createProductRequest.units.splice(index,1);
}
onUpload(event:Event){
  console.log(event)
  this.image=event;
  console.log("abc:"+this.image.currentFiles[0])
  console.log(this.image.currentFiles[0]);
  this.prodService.pushFileToStorage(this.image.currentFiles[0],this.language).subscribe(result=>{
    this.createProductResponse=result as CreateProductResponse;
    if(this.createProductResponse.status.status=== '1'){
      this.fileId=this.createProductResponse.id;
      this.success(this.createProductResponse.status.message);
    }else{
      this.failed(this.createProductResponse.status.message);
    }
  });
}

  onRemove(){
    console.log("remote: "+this.fileId);
    this.fileId=0;

  }
getUnitChild(){
  this.unitService.getChild(this.selectedUnitParent.unitId,this.language).subscribe(response=>{
    this.getUnitChileResponse = response as GetUnitChildResponse;
    if(this.getUnitChileResponse.status.status=== '0'){
      this.failed(this.getUnitChileResponse.status.message);
    }else{
      this.unit=this.unit={"unitName":"","inPrice":0,"outPrice":0,"parentId":0,"unitId":0};
      this.createProductRequest.units.push(this.unit);
    }
  })

}

craeteUnit(id:number){
  this.unit={"unitName":this.selectedUnitChilds[id].unitName,"inPrice":0,"outPrice":0,"parentId":this.selectedUnitChilds[id].parentId,"unitId":this.selectedUnitChilds[id].unitId};
  this.createProductRequest.units[id]=this.unit;
}

success(message: string) {
  this.messageService.add({severity:'success', summary: this.translateService.getvalue("message.success"), detail: message});
}

failed(message: string) {
  this.messageService.add({severity:'error', summary: this.translateService.getvalue("message.failed"), detail: message});
}
}

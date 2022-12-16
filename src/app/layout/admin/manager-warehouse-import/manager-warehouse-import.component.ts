import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { GetInfoCreateProdResponse } from 'src/app/shared/model/response/GetInfoCreateProdResponse';
import { CreateProductResponse } from 'src/app/shared/model/response/CreateProductResponse';
import { CreateProductRequest } from 'src/app/shared/model/request/CreateProductRequest';

import { Unit } from 'src/app/shared/model/Unit';
import { InfoUnitItem } from 'src/app/shared/model/InfoUnitItem';
import { UnitService } from 'src/app/services/unit/unit.service';
import { GetUnitChildResponse } from 'src/app/shared/model/response/GetUnitChildResponse';
import {ProductService} from "../../../services/admin/product/product.service";
import { Category } from '../../../shared/model/category.model';
import { ImportInWarehouseRequest } from 'src/app/shared/model/request/importInWarehouseRequest';
import { ImportSupplierService } from 'src/app/services/admin/import/import-supplier.service';
import { ListImportWarehouseInRedis } from '../../../shared/model/response/ListImportWarehouseInRedis';
import { ImportInWarehouseInRedis } from 'src/app/shared/model/response/ImportInWarehouseInRedis';
import { BaseResponse } from '../../../shared/model/response/BaseResponse';
import { SelectionTypeProductItems } from '../../../shared/model/selectionTypeProductItems';
import { EditImportWarehouseResponse } from '../../../shared/model/response/editImportWarehouseResponse';
import { GetSupplierItem } from 'src/app/shared/model/response/GetSupplieritem';

@Component({
  selector: 'app-manager-warehouse-import',
  templateUrl: './manager-warehouse-import.component.html',
  styleUrls: ['./manager-warehouse-import.component.css']
})
export class ManagerWarehouseImportComponent implements OnInit {

  status: number | undefined;
  nameSupplier?: string;
  date ?: string;
  display: boolean = false;
  uploadedFiles: any[] = [];
  image!:any;
  fileId=0;
  language!:string;
  unitLayout!:any;
  unitLayouts:any[]=[];
  es: any;
  displayUpdate:  boolean = false;

  listUnit: number[] = [];

  rangeDates?: Date[];

  createProductRequest:ImportInWarehouseRequest;
  getInforCreateProductResponse!:GetInfoCreateProdResponse;
  createProductResponse!:CreateProductResponse;
  selectedCategory: Category =new Category();
  selectedSupplier: GetSupplierItem=new GetSupplierItem();
  selectedUnitParent: InfoUnitItem=new InfoUnitItem();
  selectedUnitChilds: InfoUnitItem[]=[];
  unit!:Unit;
  getUnitChileResponse!:GetUnitChildResponse;
  importInWarehouse!: ListImportWarehouseInRedis
  data: ImportInWarehouseInRedis[]=[]
  baseResponse: BaseResponse = new BaseResponse()
  edit: EditImportWarehouseResponse = new EditImportWarehouseResponse()
  category: SelectionTypeProductItems = new SelectionTypeProductItems()

  units:Unit[]=[];


  constructor(private messageService: MessageService ,
    private prodService:ProductService,
    private unitService:UnitService,
    private translateService:TranslateConfigService,
    private importService: ImportSupplierService) {
    this.createProductRequest=new ImportInWarehouseRequest();
    this.importInWarehouse= new ListImportWarehouseInRedis();
  }

  ngOnInit(): void {
    this.language=this.translateService.getLanguage()!;
    this.getInformations();
    this.getUnitLayouts();
    this.status = 8;
    this.getProductByBarcode()
  }
  deleteById(key:number, redisId: string){
    this.importService.deleteById(key, redisId, this.language).subscribe(response => {
      this.baseResponse = response as BaseResponse;
      if(this.baseResponse.status.status=='1'){
        this.success(this.createProductResponse.status.message);
      }else{
        this.failed(this.createProductResponse.status.message);
      }
    });
    this.ngOnInit()
  }
  getAllImportInWarehouse(id: any){
    this.importService.getImportInWarehouse(id).subscribe(response => {
      this.data = response as ImportInWarehouseInRedis[];
    });
  }
  doneImpport(){
    this.importService.add(this.data).subscribe(response => {
      // this.createProductResponse = response as CreateProductResponse;
      // if(this.createProductResponse.status.status=== '1'){
      //   this.success(this.createProductResponse.status.message);
      // }else{
      //   this.failed(this.createProductResponse.status.message);
      // }
    });
    this.ngOnInit()
  }
  showDialogDetailUpdate(key:number, redisId: string){
    this.importService.edit(key, redisId, this.language).subscribe(response => {
      this.createProductRequest.supplierName = this.selectedSupplier.name
      this.edit.barCode = this.createProductRequest.barCode
      this.edit.nameProd= this.createProductRequest.nameProd
      this.edit.categoryId = this.createProductRequest.categoryId
      this.edit.unitId=this.selectedUnitParent.unitId as number;
      this.edit.unit=this.selectedUnitParent.unitName as string;
      this.edit.description= this.createProductRequest.description
      this.edit.inPrice= this.createProductRequest.inPrice

      this.edit.fileId=this.fileId;
      this.edit.supplierName=this.selectedSupplier.name as string;
      this.edit.amount= this.createProductRequest.amount
      this.edit.id= redisId
    })
    this.displayUpdate= true;
  }

  update(){
    if(this.selectedCategory!=null){
    this.createProductRequest.categoryId=this.selectedCategory.id as number;
    }
    if(this.selectedSupplier!=null){
      this.createProductRequest.supplierId=this.selectedSupplier.id as number;
      this.createProductRequest.supplierName=this.selectedSupplier.name as string;
    }
    if(this.selectedUnitParent!=null){
      this.createProductRequest.unitId=this.selectedUnitParent.unitId as number;
      this.createProductRequest.unit=this.selectedUnitParent.unitName as string;
    }

    this.createProductRequest.fileId=this.fileId;
    this.importService.update(this.createProductRequest,this.createProductRequest.supplierId, this.edit.id).subscribe(response => {
      this.createProductResponse = response as CreateProductResponse;
      if(this.createProductResponse.status.status=== '1'){
        this.success(this.createProductResponse.status.message);
      }else{
        this.failed(this.createProductResponse.status.message);
      }
      this.ngOnInit()
    });

  }

  getProductByBarcode() {
    this.importService.getProductByBarcode(this.createProductRequest.barCode, this.language).subscribe(response => {
      // this.selectedCategory.id=response.category.id
      // this.createProductRequest.nameProd= response.productName
      // this.createProductRequest.description= response.desciption
    })
  }
  getUnitLayouts(){
    this.unitLayout=1;
    this.unitLayouts.push(1);
  }

  getInformations(){
    console.log("liên nè")
    this.prodService.getInforCreateProduct().subscribe(response => {
      this.getInforCreateProductResponse = response as GetInfoCreateProdResponse;
      console.log(this.getInforCreateProductResponse.unitItems);
    });
  }


  showDialog() {
    this.display = true;
  }
  createUnitLayout(){
    this.unitLayout=this.unitLayouts.length+1;
    this.unitLayouts.push(this.unitLayout);
    this.unit=this.unit={"unitName":"","inPrice":0,"outPrice":0,"parentId":0,"unitId":0};
    this.createProductRequest.units.push(this.unit);
  }
  create(){
    if(this.selectedCategory!=null){
    this.createProductRequest.categoryId=this.selectedCategory.id as number;
    console.log(this.createProductRequest.categoryId+" dòng 186"+ this.createProductRequest.inPrice)
    }
    if(this.selectedSupplier!=null){
      this.createProductRequest.supplierId=this.selectedSupplier.id as number;
      this.createProductRequest.supplierName=this.selectedSupplier.name as string;
    }
    if(this.selectedUnitParent!=null){
      this.createProductRequest.unitId=this.selectedUnitParent.unitId as number;
      this.createProductRequest.unit=this.selectedUnitParent.unitName as string;
    }

    this.createProductRequest.fileId=this.fileId;

    this.importService.createImportWarehouse(this.createProductRequest).subscribe(response => {
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
  onRemove(){
    console.log("remote: "+this.fileId);
    this.fileId=0;

  }
  getUnitChild(){
    // this.unitService.getChild(this.selectedUnitParent.unitId,this.language).subscribe(response=>{
    //   this.getUnitChileResponse = response as GetUnitChildResponse;
    //   if(this.getUnitChileResponse.status.status=== '0'){
    //     this.failed(this.getUnitChileResponse.status.message);
    //   }else{
    //     this.unit=this.unit={"unitName":"","inPrice":0,"outPrice":0,"parentId":0,"unitId":0};
    //     this.createProductRequest.units.push(this.unit);
    //   }
    // })
    this.importService.findByUnitId(this.selectedUnitParent.unitId,this.language).subscribe(response=>{
      this.createProductRequest.units = response as Unit[]
    })

  }

  onUpload(event:Event){
    console.log(event)
    this.image=event;
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
  deleteUnitLayout(index:number){
    this.unitLayouts.splice(index,1);
    this.createProductRequest.units.splice(index,1);
  }

  pushUnit() {
    if (this.listUnit.length == 0) {
      this.listUnit.push(1);
    } else {
      let num = this.listUnit[this.listUnit.length - 1];
      this.listUnit.push(++num);
    }
  }

  removeUnit(index: number) {
    this.listUnit = this.listUnit.filter(x => x !== index);
  }
  success(message: string) {
    this.messageService.add({severity:'success', summary: this.translateService.getvalue("message.success"), detail: message});
  }

  failed(message: string) {
    this.messageService.add({severity:'error', summary: this.translateService.getvalue("message.failed"), detail: message});
  }
  craeteUnit(id:number){
    this.unit={"unitName":this.selectedUnitChilds[id].unitName,"inPrice":0,"outPrice":0,"parentId":this.selectedUnitChilds[id].parentId,"unitId":this.selectedUnitChilds[id].unitId};
    this.createProductRequest.units[id]=this.unit;
  }

}

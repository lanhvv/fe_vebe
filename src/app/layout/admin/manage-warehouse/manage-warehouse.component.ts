import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import * as XLSX from 'xlsx';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../../../services/admin/product/product.service";
import {HttpClient} from "@angular/common/http";
import { GetInfoCreateProdResponse } from 'src/app/shared/model/response/GetInfoCreateProdResponse';
import { GetSupplierItem } from 'src/app/shared/model/response/GetSupplieritem';
import { ImportSupplierService } from 'src/app/services/admin/import/import-supplier.service';
import { ImportInWarehouseInRedis } from 'src/app/shared/model/response/ImportInWarehouseInRedis';
import { BaseResponse } from 'src/app/shared/response/BaseResponse';
import { SelectionTypeProductItems } from 'src/app/shared/model/selectionTypeProductItems';
import { InfoUnitItem } from 'src/app/shared/model/InfoUnitItem';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { CreateProductResponse } from 'src/app/shared/model/response/CreateProductResponse';
import { ImportInWarehouseRequest } from 'src/app/shared/model/request/importInWarehouseRequest';
import { Category } from 'src/app/shared/model/category.model';
import { GetUnitChildResponse } from 'src/app/shared/model/response/GetUnitChildResponse';
import { Unit } from 'src/app/shared/model/Unit';
import { ListImportWarehouseInRedis } from 'src/app/shared/model/response/ListImportWarehouseInRedis';
import { EditImportWarehouseResponse } from 'src/app/shared/model/response/editImportWarehouseResponse';
import { UnitService } from 'src/app/services/unit/unit.service';
type AOV = any[][];
@Component({
  selector: 'app-manage-warehouse',
  templateUrl: './manage-warehouse.component.html',
  styleUrls: ['./manage-warehouse.component.css']
})
export class ManageWarehouseComponent implements OnInit {

  status: number | undefined;
  nameSupplier?: string;
  date ?: string;
  display: boolean = false;
  updateDisplay: boolean = false;
  uploadedFiles: any[] = [];
  listUnit: number[] = [];
  rangeDates?: Date[];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  excelForm!: FormGroup;
  url: string | ArrayBuffer | null = '';
  enableImage: boolean = false;
  language!:string;
  fileId=0;
  id!: number
  image!:any;
  es: any;

  currentFile?: File;
  selectedFiles?: FileList;


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
  items: ImportInWarehouseInRedis[]=[]
  baseResponse: BaseResponse = new BaseResponse()
  edit: EditImportWarehouseResponse = new EditImportWarehouseResponse()
  category: SelectionTypeProductItems = new SelectionTypeProductItems()

  updateWarehouse!: FormGroup;

  units:Unit[]=[];


  constructor(private messageService: MessageService ,
              private prodService:ProductService,
              private unitService:UnitService,
              private translateService:TranslateConfigService,private fb: FormBuilder,
              private importService: ImportSupplierService) {
    this.createProductRequest=new ImportInWarehouseRequest();
    this.importInWarehouse= new ListImportWarehouseInRedis();
  }

  ngOnInit(): void {
    this.language=this.translateService.getLanguage()!;
    this.status = 8;
    this.getInformations();
  }

  data: AOV = [
    [1, 2],
    [3, 4]
  ];

  getAllImportInWarehouse(id: any){
    this.importService.getImportInWarehouse(id).subscribe(response => {
      this.items = response as ImportInWarehouseInRedis[];
    });
  }
  back(){
    window.history.back();
  }
  update(){
    if(this.selectedCategory!=null){
      this.edit.categoryId=this.selectedCategory.id as number;
    }
    if(this.selectedSupplier!=null){
      this.edit.supplierId=this.selectedSupplier.id as number;
      this.edit.supplierName=this.selectedSupplier.name as string;
    }
    if(this.selectedUnitParent!=null){
      this.edit.unitId=this.selectedUnitParent.unitId as number;
      this.edit.unit=this.selectedUnitParent.unitName as string;
    }

    this.edit.fileId=this.fileId;
    this.importService.update(this.edit,this.edit.supplierId, this.edit.id).subscribe(response => {
      this.createProductResponse = response as CreateProductResponse;
      if(this.createProductResponse.status.status=== '1'){
        this.getAllImportInWarehouse(this.edit.supplierId);
        this.success(this.createProductResponse.status.message);
      }else{
        this.failed(this.createProductResponse.status.message);
      }

    });

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
    this.getAllImportInWarehouse(key);

  }
  getById(key:number, redisId: string){
    this.importService.edit(key, redisId, this.language).subscribe(response => {
      this.edit = response as EditImportWarehouseResponse
      this.updateDisplay= true
    });

  }
  doneImpport(){
    this.importService.add(this.items).subscribe(response => {
      // this.createProductResponse = response as CreateProductResponse;
      // if(this.createProductResponse.status.status=== '1'){
      //   this.success(this.createProductResponse.status.message);
      // }else{
      //   this.failed(this.createProductResponse.status.message);
      // }
    });
    this.ngOnInit()
  }
  getInformations(){
    this.prodService.getInforCreateProduct().subscribe(response => {
      this.getInforCreateProductResponse = response as GetInfoCreateProdResponse;
      console.log(this.getInforCreateProductResponse.unitItems);
    });
  }
  create(){
    console.log(this.selectedCategory.id+" dòng 116"+ this.createProductRequest.amount)
    if(this.selectedCategory!=null){
      this.createProductRequest.categoryId=this.selectedCategory.id ;
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
    this.getAllImportInWarehouse( this.createProductRequest.supplierId);

  }
  getProductByBarcode() {
    this.importService.getProductByBarcode(this.createProductRequest.barCode, this.language).subscribe(response => {
      this.createProductRequest.nameProd =response.productName
      this.selectedCategory.id = response.category.id
      this.createProductRequest.description = response.desciption
    })
  }

  showDialog() {
    this.display = true;
  }

  // onUpload(){

  //   if (this.selectedFiles) {
  //     const file: File | null = this.selectedFiles.item(0);

  //     if (file) {
  //       this.currentFile = file;
  //       this.prodService.pushFileToStorage(this.currentFile,this.language).subscribe(result=>{
  //         this.createProductResponse=result as CreateProductResponse;
  //         if(this.createProductResponse.status.status=== '1'){
  //           this.fileId=this.createProductResponse.id;
  //         }else{
  //         }
  //       });
  //     }
  //   }

  // }
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

//  upload file excel
  onFileChange(evt: any){
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOV>XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log(this.data);
      this.excelForm = this.fb.group({
        data: this.fb.array([]),
      });
      const formArray = this.excelForm.get('data') as FormArray;
      for (let i = 1; i < this.data.length; i++) {
        const formGroup = {};
        for (let j = 0; j < this.data[0].length; j++) {
          // @ts-ignore
          formGroup[this.data[0][j]] = [this.data[i][j]];
        }
        formArray.push(this.fb.group(formGroup));
      }
    };
    reader.readAsBinaryString(target.files[0]);
  }

  onFileSelectedImage(event: any){

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
        this.enableImage = true;

      }
      reader.readAsDataURL(event.target.files[0]);

    }

  }
  onRemove(){
    console.log("remote: "+this.fileId);
    this.fileId=0;

  }


  changeImage(){
    this.url = '';
    this.enableImage = false;
  }
  success(message: string) {
    this.messageService.add({severity:'success', summary: this.translateService.getvalue("message.success"), detail: message});
  }

  failed(message: string) {
    this.messageService.add({severity:'error', summary: this.translateService.getvalue("message.failed"), detail: message});
  }
}

import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {SupplierService} from "../../../../services/v_supplier/supplier.service";
import {TranslateConfigService} from "../../../../services/translate-config.service";
import {GetSuppliersResponse} from "../../../../shared/response/v_supplier/GetSuppliersResponse";
import {ConfirmationService, MessageService} from "primeng/api";
import {GetSupplierResult} from "../../../../shared/result/v_supplier/GetSupplierResult";
import {ImportWarehouseResponse} from "../../../../shared/response/v_warehouse/ImportWarehouseResponse";
import {ImportProductResult} from "../../../../shared/result/product/ImportProductResult";
import {CreateProductResponse} from "../../../../shared/model/response/CreateProductResponse";
import {WarehouseService} from "../../../../services/v_warehouse/warehouse.service";
import {TypeProductService} from "../../../../services/type-product/type-product.service";
import {GetTypeProductResponse} from "../../../../shared/response/v_type_product/GetTypeProductResponse";
import {GetUnitResponse} from "../../../../shared/response/v_unit/GetUnitResponse";
import {UnitService} from "../../../../services/unit/unit.service";
import {GetExportsByUnitSelectResponse} from "../../../../shared/response/v_export/GetExportsByUnitSelectResponse";
import {ExportResult} from "../../../../shared/result/v_export/ExportResult";
import {ImportService} from "../../../../services/v_import/import.service";
import {BaseResponse} from "../../../../shared/response/BaseResponse";
import {ImportWarehouseItemsResponse} from "../../../../shared/response/v_import/ImportWarehouseItemsResponse";
import {ExportService} from "../../../../services/exportPDF/export.service";
type AOV = any[][];

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.css'],
  providers: [ConfirmationService]
})

export class ImportExcelComponent implements OnInit {

  isShowData: boolean = false;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  excelForm!: FormGroup;
  language: string | undefined = 'vi';
  getSuppliersResponse!:GetSuppliersResponse;
  getTypeProductsResponse!:GetTypeProductResponse;
  getUnitResponse!: GetUnitResponse;
  searchValue!: string;
  selectedSupplier!: GetSupplierResult;
  productResponse!:ImportWarehouseResponse;
  baseResponse!:BaseResponse;
  //choose products in table to delete
  selectedProducts!: ImportProductResult[];

  //import product handmade
  product!: ImportProductResult;
  submitted!: boolean;
  productDialog!: boolean;
  getExportsByUnitSelectedResponse!: GetExportsByUnitSelectResponse;
  importResponse: ImportWarehouseItemsResponse[] = [];

  //after import
  isSidebarDialog: boolean = false;

  constructor(private fb: FormBuilder,
              private supplierService:SupplierService,
              private messageService: MessageService,
              private translateService:TranslateConfigService,
              private confirmationService: ConfirmationService,
              private warehouseService:WarehouseService,
              private typeProductService: TypeProductService,
              private unitService: UnitService,
              private importService: ImportService,
              private exportQR: ExportService) {
    // this.getSuppliersResponse = new GetSuppliersResponse();
  }

  ngOnInit(): void {
    this.getSuppliers();
    this.getCategory();
    this.language = this.translateService.getLanguage();
    this.getUnits();
    // this.showData();
  }

  data: AOV = [];

  //open dialog import product handmade
  openNew() {
    this.product = new ImportProductResult();
    this.submitted = false;
    this.productDialog = true;
  }

  //delete products selected in table
  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productResponse.products = this.productResponse.products.filter(val => !this.selectedProducts.includes(val));
        this.selectedProducts = [];
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.saveProducts();
      }
    });
  }

  //delete product selected in table
  deleteProduct(product: ImportProductResult) {
    console.log("32123123123")
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.productName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productResponse.products = this.productResponse.products.filter(val => val.id !== product.id);
        // this.product = [];
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        this.saveProducts();
      }
    });
  }

  changeFile(){
    this.data = [];
    this.isShowData = false;
  }

  importWarehouse(request:any){
    this.warehouseService.importWarehouse(this.language!,this.selectedSupplier.supplierId,request.currentFiles[0]).subscribe(response=>{
      this.productResponse=response as ImportWarehouseResponse;
      if(this.productResponse.status.status=== '1'){
        this.success(this.productResponse.status.message);
        this.saveProducts();
      }else{
        this.failed(this.productResponse.status.message);
      }
    });
  }

  getFormGroup(control: AbstractControl) {
    return control as FormGroup;
  }

  getSuppliers() {
    this.supplierService.getSuppliers(this.language+"").subscribe(response=>{
      this.getSuppliersResponse = response as GetSuppliersResponse;
      console.log(this.getSuppliersResponse);
      if (this.getSuppliersResponse.status.status === '0'){
        this.failed(this.getSuppliersResponse.status.message);
      }
    })
  }

  getCategory() {
    this.typeProductService.getTypeProducts(this.language+"").subscribe(response=>{
      this.getTypeProductsResponse = response as GetTypeProductResponse;
      console.log(this.getSuppliersResponse);
      if (this.getSuppliersResponse.status.status === '0'){
        this.failed(this.getSuppliersResponse.status.message);
      }
    })
  }

  getUnits() {
    this.typeProductService.getUnits(this.language+"").subscribe(response=>{
      this.getUnitResponse = response as GetUnitResponse;
      console.log(this.getUnitResponse);
      if (this.getUnitResponse.status.status === '0'){
        this.failed(this.getUnitResponse.status.message);
      }
    })
  }

  selectUnit(request:ImportProductResult){
    console.log(request);
    this.unitService.getUnitsByUnitSelected(this.language+"",request.unit.id).subscribe(data=>{
        this.getExportsByUnitSelectedResponse=data as GetExportsByUnitSelectResponse;
        if (this.getExportsByUnitSelectedResponse.status.status === '0'){
          this.failed(this.getExportsByUnitSelectedResponse.status.message);
        }else {
          this.productResponse.products.filter(value => value.id === request.id)[0].exports = this.getExportsByUnitSelectedResponse.results;
          this.saveProducts();
          console.log(this.productResponse.products);
        }
    })
  }

  deleteExport(req:ExportResult,request:ImportProductResult){
    this.saveProducts();
    this.productResponse.products.filter(value => value.id === request.id)[0].exports = this.productResponse.products.filter(value => value.id === request.id)[0].exports.filter(value => value.unit !== req.unit);
  }

  clear(){
    this.productResponse.products = [];
  }

  saveProducts(){
    this.warehouseService.saveProductsToRedis(this.productResponse,this.language!).subscribe(response=>{
      this.baseResponse = response as BaseResponse;
      if (this.baseResponse.status.status === '0'){
        console.log(this.baseResponse.status.message);
      }else {
        console.log(this.baseResponse.status.message);
      }
    })
  }

  success(message: string) {
    this.messageService.add({severity:'success', summary: this.translateService.getvalue("message.success"), detail: message});
  }

  failed(message: string) {
    this.messageService.add({severity:'error', summary: this.translateService.getvalue("message.failed"), detail: message});
  }

  chooseSupplier(){
    this.warehouseService.getWarehouseBySupplier(this.language!,this.selectedSupplier.supplierId).subscribe(response=>{
      this.productResponse=response as ImportWarehouseResponse;
      if(this.productResponse.status.status=== '1'){
        this.productResponse.supplierCode = this.selectedSupplier.supplierId;
        this.success(this.productResponse.status.message);
      }else{
        this.failed(this.productResponse.status.message);
      }
    });
  }

  import(){
    this.warehouseService.save(this.language!,this.selectedSupplier.supplierId).subscribe(response=>{
      const importResponse = response as ImportWarehouseItemsResponse;
      this.importResponse = [importResponse];
      // if(importResponse.status.status=== '1'){
      //   this.productResponse=new ImportWarehouseResponse();
      //   this.success(this.productResponse.status.message);
      // }else{
      //   this.failed(this.productResponse.status.message);
      // }
    });
    this.isSidebarDialog = true;
  }

  exportQRCode(code: string, amount: number){
    this.exportQR.export(code, amount, "vi");
  }

  back(){
    window.history.back();
  }
}

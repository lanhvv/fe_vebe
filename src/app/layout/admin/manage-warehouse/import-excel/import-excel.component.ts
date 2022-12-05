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
type AOV = any[][];

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.css']
})
export class ImportExcelComponent implements OnInit {

  isShowData: boolean = false;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  excelForm!: FormGroup;
  language: string | undefined = 'vi';
  getSuppliersResponse!:GetSuppliersResponse;
  searchValue!: string;
  selectedSupplier!: GetSupplierResult;
  productResponse!:ImportWarehouseResponse;

  //choose products in table to delete
  selectedProducts!: ImportProductResult[];

  //import product handmade
  product!: ImportProductResult;
  submitted!: boolean;
  productDialog!: boolean;
  constructor(private fb: FormBuilder,
              private supplierService:SupplierService,
              private messageService: MessageService,
              private translateService:TranslateConfigService,
              private confirmationService: ConfirmationService,
              private warehouseService:WarehouseService) {
    // this.getSuppliersResponse = new GetSuppliersResponse();
  }

  ngOnInit(): void {
    this.getSuppliers();
    // this.language = this.translateService.getLanguage();
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
      }
    });
  }

  //delete product selected in table
  deleteProduct(product: ImportProductResult) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.productName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productResponse.products = this.productResponse.products.filter(val => val.id !== product.id);
        // this.product = [];
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
    });
  }

  // showData(){
  //   if(this.data.length > 0){
  //     this.isShowData = true;
  //   } else{
  //     this.isShowData = false;
  //   }
  // }

  //  upload file
  // onFileChange(evt: any){
  //   /* wire up file reader */
  //   const target: DataTransfer = <DataTransfer>evt.target;
  //   if (target.files.length !== 1) throw new Error('Cannot use multiple files');
  //   const reader: FileReader = new FileReader();
  //   reader.onload = (e: any) => {
  //     /* read workbook */
  //     const bstr: string = e.target.result;
  //     const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
  //
  //     /* grab first sheet */
  //     const wsname: string = wb.SheetNames[0];
  //     const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  //
  //     /* save data */
  //     this.data = <AOV>XLSX.utils.sheet_to_json(ws, { header: 1 });
  //     this.excelForm = this.fb.group({
  //       data: this.fb.array([]),
  //     });
  //     const formArray = this.excelForm.get('data') as FormArray;
  //     for (let i = 1; i < this.data.length; i++) {
  //       const formGroup = {};
  //       for (let j = 0; j < this.data[0].length; j++) {
  //         // @ts-ignore
  //         formGroup[this.data[0][j]] = [this.data[i][j]];
  //       }
  //       formArray.push(this.fb.group(formGroup));
  //     }
  //   };
  //   reader.readAsBinaryString(target.files[0]);
  //   this.isShowData = true;
  // }

  // get excelFormArray() {
  //   return this.excelForm.get('data') as FormArray;
  // }

  // saveData(): void {
  //   // /* generate worksheet */
  //   // const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);
  //   //
  //   // /* generate workbook and add the worksheet */
  //   // const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   //
  //   // /* save to file */
  //   // XLSX.writeFile(wb, this.fileName);
  //   console.log(this.excelForm.value);
  // }

  changeFile(){
    this.data = [];
    this.isShowData = false;
  }

  importWarehouse(request:any){
    console.log(request);
    this.warehouseService.importWarehouse(this.language!,this.selectedSupplier.supplierId,request.currentFiles[0]).subscribe(response=>{
      this.productResponse=response as ImportWarehouseResponse;
      if(this.productResponse.status.status=== '1'){
        this.success(this.productResponse.status.message);
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

  clear(){
    this.productResponse.products = [];
  }

  success(message: string) {
    this.messageService.add({severity:'success', summary: this.translateService.getvalue("message.success"), detail: message});
  }

  failed(message: string) {
    this.messageService.add({severity:'error', summary: this.translateService.getvalue("message.failed"), detail: message});
  }
}

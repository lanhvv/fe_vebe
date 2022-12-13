import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import * as XLSX from 'xlsx';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import { GetInfoCreateProdResponse } from 'src/app/shared/model/response/GetInfoCreateProdResponse';
import { GetSupplierItem } from 'src/app/shared/model/response/GetSupplieritem';
import { ImportSupplierService } from 'src/app/services/admin/import/import-supplier.service';
import { ImportInWarehouseInRedis } from 'src/app/shared/model/response/ImportInWarehouseInRedis';
import { BaseResponse } from 'src/app/shared/response/BaseResponse';
import { SelectionTypeProductItems } from 'src/app/shared/model/selectionTypeProductItems';
import { InfoUnitItem } from 'src/app/shared/model/InfoUnitItem';
import { ProductService } from 'src/app/services/Product/product.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { CreateProductResponse } from 'src/app/shared/model/response/CreateProductResponse';
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
  uploadedFiles: any[] = [];
  listUnit: number[] = [];
  rangeDates?: Date[];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  excelForm!: FormGroup;
  url: string | ArrayBuffer | null = '';
  enableImage: boolean = false;
  language!:string;


  getInforCreateProductResponse!:GetInfoCreateProdResponse;
  selectedSupplier: GetSupplierItem=new GetSupplierItem();
  items: ImportInWarehouseInRedis[]=[]
  baseResponse: BaseResponse = new BaseResponse()
  category: SelectionTypeProductItems = new SelectionTypeProductItems()
  selectedUnitChilds: InfoUnitItem[]=[];
  createProductResponse!:CreateProductResponse;

  constructor(private messageService: MessageService,
    private importService: ImportSupplierService,
    private prodService:ProductService,
    private translateService:TranslateConfigService,
    private fb: FormBuilder, private http: HttpClient) {
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

  onUpload(event: any) {
    console.log(event)
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
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

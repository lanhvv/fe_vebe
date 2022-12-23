import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmEventType, ConfirmationService } from 'primeng/api';
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
import { ImportWarehouseResponse } from '../../../shared/model/response/ImportWarehouseResponse';
import {BehaviorSubject} from "rxjs";
import {BarcodeFormat} from "@zxing/library";
import {ZXingScannerComponent} from "@zxing/ngx-scanner";
import { ListCategoryImportItemsItems } from '../../../shared/model/response/ListCategoryImportItemsItems';
import { CategoryImportItems } from '../../../shared/item/v_import/CategoryImportItems';
import { ListImportWarehouse } from '../../../shared/model/response/ListImportWarehouse';
import { ImportWarehouseItemsResponse } from '../../../shared/response/v_import/ImportWarehouseItemsResponse';
import {UploadFileService} from "../../../services/upload_file/upload-file.service";
import { Units } from '../../../shared/model/Units';
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
  isShowFinal: boolean = false;

  //after import
  isSidebarDialog: boolean = false;
  importResponse!: ImportWarehouseItemsResponse;

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
  categoryItems: ListCategoryImportItemsItems = new ListCategoryImportItemsItems()
  categoryitem: CategoryImportItems = new CategoryImportItems()
  itemsafterDone: ListImportWarehouse = new ListImportWarehouse()

  importWarehouseResponse: ImportWarehouseResponse[]=[]

  updateWarehouse!: FormGroup;

  units:Units[]=[];

  //open cam
  dialogScanQR: boolean = false;
  enable : boolean = true;
  hasPermission !: boolean;
  torchEnabled = false;
  tryHarder = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/ ];
  scanner !: ZXingScannerComponent;
  availableDevices !: MediaDeviceInfo[];
  currentDevice !: MediaDeviceInfo | undefined;
  enableCameraState : boolean = false;
  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  constructor(private messageService: MessageService ,
              private prodService:ProductService,
              private unitService:UnitService,
              private translateService:TranslateConfigService,private fb: FormBuilder,
              private confirmationService: ConfirmationService,
              private uploadFileService: UploadFileService,
              private importService: ImportSupplierService) {
    this.createProductRequest=new ImportInWarehouseRequest();
    this.importInWarehouse= new ListImportWarehouseInRedis();
  }

  ngOnInit(): void {
    this.language=this.translateService.getLanguage()!;
    this.status = 8;
    this.getInformations();
    this.getAllType()
  }

  data: AOV = [
    [1, 2],
    [3, 4]
  ];

  getAllImportInWarehouse(id: any){
    this.importService.getImportInWarehouse(id).subscribe(response => {
      this.items = response as ImportInWarehouseInRedis[];
      console.log(response)
      if(response.length === 0){
        this.isShowFinal = false;
      } else {
        this.isShowFinal = true;
      }
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
    this.importService.update(this.edit.supplierId, this.edit.id,this.edit).subscribe(response => {
      this.createProductResponse = response as CreateProductResponse;
      if(this.createProductResponse.status.status=== '1'){
        this.getAllImportInWarehouse(this.edit.supplierId);
        this.success(this.createProductResponse.status.message);
        this.updateDisplay = false;
      }else{
        this.failed(this.createProductResponse.status.message);
        this.updateDisplay = true;
      }

    });

  }

  deleteById(key:number, redisId: string){
    this.confirmationService.confirm({
      message: 'Do you want to delete this account?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.importService.deleteById(key, redisId, this.language).subscribe(response => {
          this.baseResponse = response as BaseResponse;
          if (this.baseResponse.status.status === '1') {
            this.messageService.add({severity: 'info', summary: 'Confirmed', detail: this.baseResponse.status.message});
            this.getAllImportInWarehouse(key);
          } else {
            this.messageService.add({severity: 'error', summary: 'Confirmed', detail: this.baseResponse.status.message});
          }
        });

      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected'});
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled'});
            break;
        }
      }
    });


  }
  getAllType(){
    this.importService.getAllType().subscribe(response => {
      this.categoryItems = response as ListCategoryImportItemsItems
      console.log( this.categoryItems  +" dòng197")
    })
  }

  getById(key:number, redisId: string){
    this.importService.edit(key, redisId, this.language).subscribe(data => {
      this.selectedUnitParent.unitId = data.unitId
      this.selectedUnitParent.unitName = data.unit
      this.selectedUnitParent.amount = data.amountUnit
      this.selectedUnitParent.description = data.descriptionUnit
      this.selectedCategory.id = data.categoryId as number
      this.selectedCategory.name = data.categoryName
      this.edit = data as EditImportWarehouseResponse
      this.updateDisplay= true
    });

  }

  doneImpport(){
    this.importService.add(this.items, this.language).subscribe(response => {
      this.itemsafterDone = response as ListImportWarehouse;
        if(this.itemsafterDone.status.status=== '1'){
          this.success(this.itemsafterDone.status.message);
          this.deleteAll(this.selectedSupplier.id)

        }else{
          this.failed(this.itemsafterDone.status.message);
        }

    });

  }

  deleteAll(key: any){
    this.confirmationService.confirm({
      message: 'Do you want to delete this account?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.importService.deleteAll(key,this.language).subscribe(response => {
          this.baseResponse = response as BaseResponse;
          if (this.baseResponse.status.status === '1') {
            this.messageService.add({severity: 'info', summary: 'Confirmed', detail: this.baseResponse.status.message});
            this.getAllImportInWarehouse(key);
          } else {
            this.messageService.add({severity: 'error', summary: 'Confirmed', detail: this.baseResponse.status.message});
          }
        });

      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected'});
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled'});
            break;
        }
      }
    });

  }
  getInformations() {
    this.importService.getInforCreateProduct().subscribe(response => {
      this.getInforCreateProductResponse = response as GetInfoCreateProdResponse;
      console.log(this.getInforCreateProductResponse.unitItems);
    });
  }

  create(){

    if(this.selectedCategory!=null){
      this.createProductRequest.categoryId=this.selectedCategory.id ;
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
        this.getAllImportInWarehouse( this.createProductRequest.supplierId);
        this.clearSearch()
        this.display = false;
      }else{
        this.failed(this.createProductResponse.status.message);
        this.display = true;
      }
    });

  }

  getProductByBarcode() {
    this.importService.getProductByBarcode(this.createProductRequest.barCode, this.language).subscribe(response => {
      this.createProductRequest.nameProd =response.productName
      this.selectedCategory = response.category
      this.createProductRequest.description = response.desciption
    })
  }

  showDialog() {
    this.display = true;
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

  getUnitChild(){

    this.importService.findByUnitId(this.selectedUnitParent.unitId,this.language).subscribe(response=>{
      this.createProductRequest.units = response as Units[]
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
   inPrice!: number;
   getPrice(){
    this.importService.getPrice(this.selectedUnitParent.unitId,this.createProductRequest.inPrice,this.createProductRequest.amount,this.language).subscribe(response=>{

      this.createProductRequest.units = response as Units[]

    })
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

  // camera
  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
  }

  //get value scan
  qrResultString !: string;
  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.dialogScanQR = false;
    this.currentDevice = undefined;
    this.createProductRequest.barCode = this.qrResultString;
    this.edit.barCode = this.qrResultString;
    console.log(this.qrResultString);
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onDeviceSelectChange(selected: Event) {
    this.enable = true;
    const device = this.availableDevices.find(x => x.deviceId === this.getValue(selected));
    // @ts-ignore
    this.currentDevice = device;
    console.log(this.currentDevice);
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  getValue(event: Event): string {
    console.log((event.target as HTMLInputElement).value);
    return (event.target as HTMLInputElement).value;
  }

  enableCamera() {
    this.enableCameraState = !this.enableCameraState;
    if (this.enableCameraState) {
      this.enable = true;
      const device = this.availableDevices.find(x => x.deviceId === this.availableDevices[1].deviceId);
      this.currentDevice = device;
      console.log(this.currentDevice);
    } else {
      this.enable = false;
      this.currentDevice = undefined;
    }
  }

  openDialogScan(){
    this.enableCamera();
    setTimeout(() => {
      this.dialogScanQR = true;
    });
  }
  clearSearch() {
    this.createProductRequest.amount = 0;
    this.createProductRequest.barCode = '';
    this.selectedCategory.name=""
  }
  exportQRCode(code: string, amount: number){
    this.uploadFileService.downloadQrCode(code, amount, "vi").subscribe(response=>{
      console.log(response);
      import("jspdf").then(jsPDF => {
        const doc = new jsPDF.jsPDF(response);
        doc.save('products.pdf');
      })
      let blob = new Blob([response as string], { type: 'application/pdf' });
      let url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
}

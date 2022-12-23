import {Component, OnDestroy, OnInit} from '@angular/core';
import {SellOfflineService} from "../../../services/employee/sell-offline.service";
import {MatDialog} from "@angular/material/dialog";
import {ViewStallResponse} from "../../../shared/model/response/ViewStallResponse";
import {ViewStallResult} from "../../../shared/model/response/ViewStallResult";
import {ProductService} from "../../../services/employee/product/product.service";
import {TranslateConfigService} from "../../../services/translate-config.service";
import {SearchViewStallResponse} from "../../../shared/model/response/SearchViewStallResponse";
import {ProductStallResult} from "../../../shared/model/response/ProductStallResult";
import {SelectProductResponse} from "../../../shared/model/response/SelectProductResponse";
import {CartItem} from "../../../shared/model/response/CartItem";
import {ExportItem} from "../../../shared/model/response/ExportItem";
import {ViewBillRequest} from "../../../shared/model/response/ViewBillResquest";
import {CreateDetailBillResult} from "../../../shared/model/response/CreateDetailBillResult";
import {TransactionBillRequest} from "../../../shared/model/request/TransactionBillRequest";
import {BaseResponse} from "../../../shared/response/BaseResponse";
import {BehaviorSubject} from "rxjs";
import {BarcodeFormat} from "@zxing/library";
import {ZXingScannerComponent} from "@zxing/ngx-scanner";
import {BillService} from "../../../services/bill/bill.service";
import { DebitUserItemsResponse } from '../../../shared/model/response/debitUserItemsResponse';
import { IDebitItems } from '../../../shared/model/iDebitIitems';
import { DebitItemsResponse } from '../../../shared/model/response/debitItemsResponse';
import { GetOrderRequest } from '../../../../../../../../Vibee/Vibee/src/app/shared/model/request/getOrderRequest';
import { ListBillItems } from '../../../shared/model/response/ListBillItems';
import { BillItems } from '../../../shared/model/billItems';
import { Filter } from '../../../../../../../../Vibee/Vibee/src/app/shared/model/Filter';
import { DebitDetailResponse } from '../../../shared/model/response/debitDetailResponse';
import { UpdateDebitRequest } from '../../../shared/model/request/updateDebitRequest';
import { CreateDebitRequest } from '../../../shared/model/request/createDebitRequest';
import { DebitResponse } from '../../../shared/model/response/debitResponse';
import { DebitService } from '../../../services/employee/debit/debit.service';
import { PayRequest } from '../../../shared/model/request/PayRequest';
import { ListPayRequest } from '../../../shared/model/request/ListPayRequest';
import { DebitDetailItems } from '../../../shared/model/request/DebitDetailItems';
import { MessageService } from 'primeng/api';
import { DebitBillRequest } from '../../../shared/model/request/DebitBillRequest';

@Component({
  selector: 'app-sell-offline',
  templateUrl: './sell-offline.component.html',
  styleUrls: ['./sell-offline.component.css']
})
export class SellOfflineComponent implements OnInit, OnDestroy {
  status: number | undefined;
  language!: string;
  listCart: any = "";
  toltal: number = 0;
  username: string = '';
  check: any;
  checkList: any;
  moneyPay= 0;
  private char: any;
  productResponse!:SearchViewStallResponse;
  products!:ProductStallResult[];
  productSelected!:SelectProductResponse;
  search!:any;
  cartItem:CartItem;
  carts!:CartItem[];
  index=0;
  cartsItem:ViewStallResult[];
  selectedUnit!:ExportItem;
  cartCode!:string;
  viewBillRequest!:ViewBillRequest;
  listBill = [1];
  listDetailBill = [1];
  isButtonPOS = false;
  isPayment = true;
  selectedValue: string = 'money';
  currentBill = 1;
  dialogPayment: boolean = false;
  createDialog: boolean = false
  sumPrice=0;
  createDetailBillResult!:CreateDetailBillResult;
  unitIndex=0;
  transactionRequest!:TransactionBillRequest;
  transactionResponse!:BaseResponse;
  moneyTransaction=0;
  moneyPayment=0;
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
  dialogExportBill: boolean = false;
  enableDone:boolean=true;
  closeButton=0;

  debitItems: DebitDetailItems[] = []
  payRequest!: PayRequest
  payRequests: ListPayRequest

  debitUserItemsResponse: DebitUserItemsResponse;

  itemsDebit: IDebitItems[] = [];
  debitItemsResponses: DebitItemsResponse[] = [];
  debitItemsResponse: DebitItemsResponse;
  getOrderRequest!: GetOrderRequest;
  billItems:  ListBillItems
  billItem:  BillItems
  page: number = 0;
  pageSize: number = 10;
  filter!: Filter;
  searchText = '';
  dialogVisible!: boolean;
  debitDetail: DebitDetailResponse[] = [];
  createDebitRequest: CreateDebitRequest;

  updateDebitRequest: UpdateDebitRequest;

  editDebitRequest: UpdateDebitRequest;
  debtRequest: DebitBillRequest= new DebitBillRequest()


  debitResponse: DebitResponse
  updateDialog!: boolean
  payDialog!:boolean
  es: any;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  constructor(private translateService: TranslateConfigService,
              private sellOfflineService: SellOfflineService,
              private productService:ProductService,private debitService: DebitService,private messageService: MessageService,
              private billService:BillService) {

    this.cartsItem=[];
    this.carts=[];
    this.cartCode="CartCode::"+1234;
    this.cartItem=new CartItem();
    this.cartItem.cartCode=this.cartCode;
    this.carts.push(this.cartItem);
    this.cartsItem.push(new ViewStallResult());
    this.transactionRequest=new TransactionBillRequest();
    this.transactionRequest.cartCode=this.cartCode;
    this.transactionRequest.transactionType="Thanh Toán";
    this.debitItemsResponse = new DebitItemsResponse();
    this.createDebitRequest = new CreateDebitRequest();
    this.debitResponse = new DebitResponse();
    this.updateDebitRequest = new UpdateDebitRequest()
    this.payRequest = new PayRequest()
    this.payRequests = new ListPayRequest()
    this.debitUserItemsResponse = new DebitUserItemsResponse();
    this.editDebitRequest = new UpdateDebitRequest()
    this.billItems = new ListBillItems()
    this.billItem = new BillItems()
  }

  ngOnInit(): void {
    this.checkMoneyPay();
    this.getProduct();
    this.status = 2;
    this.language = this.translateService.getLanguage()!;
    this.toltal = 0;
    if (this.listCart.length === 0) {
      this.checkList = true;
    } else {
      this.checkList = false;
    }

    this.enableCamera();
  }

  ngOnDestroy(): void {
    this.enable = false;
  }

  openDialogDelete(productId: any) {
    this.sellOfflineService.xoaSanPham(productId);
    alert("Xóa thành công")
    this.ngOnInit();
  }


  OpenPayment() {
    if (this.listCart.length === 0) {
      alert("Bạn chưa mua hàng để thanh toán");
    } else {

    }
  }


  numToString() {
    if (this.viewBillRequest==null || this.viewBillRequest.detailBills.length==0){
      return 0;
    }
    this.sumPrice=0;
    for (let i=0; i<this.viewBillRequest.detailBills.length; i++) {
      this.sumPrice+=(this.viewBillRequest.detailBills[i].export.outPrice*this.viewBillRequest.detailBills[i].amount);
    }
    return this.sumPrice;
  }

  deleteBill(index: number) {
    this.listBill = this.listBill.filter(x => x !== index);
    this.listDetailBill = this.listDetailBill.filter(x => x !== index);
    if (this.listBill.length < 10) {
      this.isButtonPOS = false;
    }
  }

  addBill() {
    if (this.listBill.length == 10) {
      this.isButtonPOS = true;
    } else {
      let lastNumber = this.listBill[this.listBill.length - 1];
      this.listBill.push(++lastNumber);
      this.listDetailBill.push(lastNumber);
    }
  }

  choosePayment() {
    this.isPayment = this.selectedValue == 'money' || this.selectedValue == 'both';
  }

  chooseABoth(){
    this.selectedValue = 'both';
    this.choosePayment();
  }

  getProduct(){
    console.log("getProduct")
    this.productService.getProducts(this.language).subscribe(response=>{
      this.productResponse=response as ViewStallResponse;
      if (this.productResponse.status.status==="1"){
        this.products=this.productResponse.results;
      }
    })
  }

  selectProduct(productCode:string){
    this.productService.selectProduct(this.language,productCode,this.cartCode).subscribe(response=>{
      this.productSelected=response as SelectProductResponse;
      if (this.productSelected.status.status==="1"){
        this.transactionRequest.viewStallResults.push(this.productSelected.result);
        this.moneyPayment+=this.productSelected.result.exportSelected.outPrice*this.productSelected.result.amount;
      }
    })
    this.checkMoneyPay();
  }
  showDialogPayment() {
    this.isPayment = false;
    this.dialogPayment = true;
  }

  showDialogDebt() {
    this.createDialog = true;
  }

  deleteProductOnCart(code: string){
    this.transactionRequest.viewStallResults=this.transactionRequest.viewStallResults.filter(x=>x.productCode!==code);
    this.changeAmount();
  }

  changeAmount() {
    this.checkMoneyPay();
    this.billService.saveBilltoRedis(this.transactionRequest).subscribe(response=>{
      console.log(response);
    })
  }

  transaction(){
    this.transactionRequest.paymentMethod=this.selectedValue;
    if (this.moneyTransaction!=null){
      this.transactionRequest.inPrice=this.moneyPay+this.moneyTransaction;
    }else {
      this.transactionRequest.inPrice = this.moneyPay;
    }
    this.transactionRequest.language=this.language;
    this.billService.transactionBill(this.transactionRequest).subscribe(response=>{
      this.transactionResponse=response as BaseResponse;
      if (this.transactionResponse.status.status==="1"){
        this.isPayment=true;
        this.dialogPayment=false;
        this.cartsItem=[];
        this.viewBillRequest.detailBills=[];
        this.cartCode="";
        this.cartItem=new CartItem();
      }
    })
    this.dialogPayment = false;
    this.dialogExportBill = true;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
  }

  //get value scan
  qrResultString !: string;
  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.dialogScanQR = false;
    this.currentDevice = undefined;
    this.selectProduct(this.qrResultString);
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

  exportBill(){
    //  xử lý xuất bill file pdf
    this.dialogExportBill = false;
  }

  validate(number:number){

    if (number==null){
      (<HTMLInputElement> document.getElementById("btn-transaction")).disabled = true;
    }
    this.checkMoneyPay();
    
  }

  checkMoneyPay(){

    if (this.moneyPay==null || this.moneyPay==0){
      (<HTMLInputElement> document.getElementById("btntransaction")).disabled = true;
    }else if (this.selectedValue==="money" && this.moneyPay<this.moneyPayment){
      (<HTMLInputElement> document.getElementById("btntransaction")).disabled = true;
    }else{
      (<HTMLInputElement> document.getElementById("btntransaction")).disabled = false;
    }
  }

  addAmount(request: ViewStallResult) {
    console.log("addAmount");
    this.moneyPayment += request.amount * request.exportSelected.outPrice;
    this.changeAmount()
  }
  addDebtPrice(request: ViewStallResult) {
    console.log("addAmount");
    this.moneyPayment += request.amount * request.exportSelected.outPrice;
    this.debtRequest.totalPriceDebt=  this.moneyPayment - this.moneyPay;
    this.changeAmount()
  }

  create() {

    this.debtRequest.paymentMethod=this.selectedValue;
    if (this.moneyTransaction!=null){
      this.debtRequest.inPrice=this.moneyPay+this.moneyTransaction;
    }else {
      this.debtRequest.inPrice = this.moneyPayment - this.moneyPay;
    }
    this.debtRequest.totalPriceDebt = this.moneyPayment - this.moneyPay;;
      this.debtRequest.language=this.language;
      this.billService.debit(this.debtRequest).subscribe(response=>{
        this.transactionResponse=response as BaseResponse;
        if (this.transactionResponse.status.status==="1"){
          this.isPayment=true;
          this.dialogPayment=false;
          this.cartsItem=[];
          this.viewBillRequest.detailBills=[];
          this.cartCode="";
          this.cartItem=new CartItem();
        }
      })
      this.dialogPayment = false;
      this.dialogExportBill = true


  }
}

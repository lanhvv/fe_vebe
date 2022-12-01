import { Component, OnInit } from '@angular/core';
import {TranslateConfigService} from "../../../services/translate-config.service";
import {SellOfflineService} from "../../../services/employee/sell-offline.service";
import {SearchViewStallResponse} from "../../../shared/model/response/SearchViewStallResponse";
import {ProductStallResult} from "../../../shared/model/response/ProductStallResult";
import {SelectProductResponse} from "../../../shared/model/response/SelectProductResponse";
import {CartItem} from "../../../shared/model/response/CartItem";
import {ViewStallResult} from "../../../shared/model/response/ViewStallResult";
import {ExportItem} from "../../../shared/model/response/ExportItem";
import {ProductService} from "../../../services/employee/product/product.service";
import {ViewStallResponse} from "../../../shared/model/response/ViewStallResponse";
import {Unit} from "../../../shared/model/Unit";
import {ViewBillRequest} from "../../../shared/model/response/ViewBillResquest";
import {CreateDetailBillResult} from "../../../shared/model/response/CreateDetailBillResult";
import {BillService} from "../../../services/bill/bill.service";
import {TransactionBillRequest} from "../../../shared/model/request/TransactionBillRequest";
import {BaseResponse} from "../../../shared/response/BaseResponse";

@Component({
  selector: 'app-sell-pos',
  templateUrl: './sell-pos.component.html',
  styleUrls: ['./sell-pos.component.css']
})
export class SellPosComponent implements OnInit {
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
  sumPrice=0;
  createDetailBillResult!:CreateDetailBillResult;
  unitIndex=0;
  transactionRequest!:TransactionBillRequest;
  transactionResponse!:BaseResponse;
  constructor(
    private translateService: TranslateConfigService,
    private sellOfflineService: SellOfflineService,
    private productService:ProductService,
    private billService:BillService
  ) {
    this.cartsItem=[];
    this.carts=[];
    this.cartCode="CartCode::"+(new Date().getTime());
    // console.log(this.cartCode);
    this.cartItem=new CartItem();
    this.cartItem.cartCode=this.cartCode;
    this.carts.push(this.cartItem);
    this.cartsItem.push(new ViewStallResult());
  }

  ngOnInit(): void {
    this.cartCode="CartCode::"+(new Date().getTime())
    console.log(this.cartCode)
    this.cartItem.cartCode=this.cartCode;
    this.status = 7;
    this.language = this.translateService.getLanguage()!;
    this.toltal = 0;
    // this.getTotal();
    if (this.listCart.length === 0) {
      this.checkList = true;
    } else {
      this.checkList = false;
    }
  }

  // getTotal() {
  //   this.listCart = this.sellOfflineService.getListGioHang();
  //   if (this.listCart.length !== 0) {
  //     for (let i = 0; i < this.listCart.length; i++) {
  //       this.toltal += (this.listCart[i].gia * ((100 - this.listCart[i].promotion) / 100)) * this.listCart[i].productQuantity;
  //     }
  //   }
  // }

  openDialogDelete(productId: any) {
    this.sellOfflineService.xoaSanPham(productId);
    alert("Xóa thành công")
    this.ngOnInit();
  }

  // payment() {
  //   var listProduct = this.sellOfflineService.getListGioHang();
  //   console.log(this.listCart);
  //   for (let i = 0; i < this.listCart.length; i++) {
  //     var productId = this.listCart[i].masp;
  //     var productName = this.listCart[i].tensp;
  //
  //   }
  //
  // }

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
      this.sumPrice+=(this.viewBillRequest.detailBills[i].outPrice*this.viewBillRequest.detailBills[i].amount);
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

  // addBill() {
  //   if (this.listBill.length == 10) {
  //     this.isButtonPOS = true;
  //   } else {
  //     let lastNumber = this.listBill[this.listBill.length - 1];
  //     this.listBill.push(++lastNumber);
  //     this.listDetailBill.push(lastNumber);
  //   }
  // }

  choosePayment() {
    if (this.selectedValue == 'money') {
      this.isPayment = true;
    } else {
      this.isPayment = false;
    }
  }

  changeBill(index: number) {
    this.selectCart(index);
    this.currentBill = index;
  }

  getProduct(input:Event){
    console.log(input)
    this.search=input
    this.productService.search(this.language,this.search.filter).subscribe(response=>{
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
        this.createDetailBillResult=new CreateDetailBillResult()
        this.createDetailBillResult.productCode=this.productSelected.result.productCode;
        this.createDetailBillResult.productId=this.productSelected.result.productId;
        this.createDetailBillResult.unitId=this.productSelected.result.items[this.productSelected.result.items.length-1].unitId;
        this.createDetailBillResult.img=this.productSelected.result.img;
        this.createDetailBillResult.productName=this.productSelected.result.productName;
        this.createDetailBillResult.amount=this.productSelected.result.amount;
        this.createDetailBillResult.outPrice=this.productSelected.result.items[this.productSelected.result.items.length-1].outPrice;
        this.createDetailBillResult.importId=this.productSelected.result.importId;
        this.createDetailBillResult.barCode=this.productSelected.result.barCode;
        this.createDetailBillResult.exportId=this.productSelected.result.items[this.productSelected.result.items.length-1].exportId;
        if (this.viewBillRequest==null){
          this.viewBillRequest=new ViewBillRequest();
          this.viewBillRequest.detailBills=[this.createDetailBillResult];
        }else{
          this.viewBillRequest.detailBills.push(this.createDetailBillResult);
        }
        // this.cartsItem.push(this.productSelected.result);
        if (this.carts.filter((item)=>item.cartCode===this.cartCode)[0].products==null){
          this.carts.filter((item)=>item.cartCode===this.cartCode)[0].products=[this.productSelected.result];
          this.cartsItem=this.carts.filter((item)=>item.cartCode===this.cartCode)[0].products;
        }else {
          this.carts.filter((item)=>item.cartCode===this.cartCode)[0].products.push(this.productSelected.result);
          this.cartsItem=this.carts.filter((item)=>item.cartCode===this.cartCode)[0].products;
        }
        this.viewBillRequest.cartCode=this.cartCode;
        this.carts.push(this.cartItem);
        this.billService.saveBilltoRedis(this.viewBillRequest).subscribe(response=>{
          console.log(response);
        })
      }
    })

  }

  selectUnit(unitId:number,importId:number){
    this.index=unitId;
    for (let i=0;i<this.cartItem.products.length;i++){
      if (this.cartItem.products[i].productId===importId) {
        for (let j = 0; j < this.cartItem.products[i].items.length; j++) {
          if (this.cartItem.products[i].items[j].unitId === unitId) {
            this.selectedUnit = this.cartItem.products[i].items[j];
          }
        }
      }
    }
  }

  // createCart(){
  //   this.cartCode="CartCode::"+(new Date().getFullYear())
  //   this.cartItem=new CartItem();
  //   this.cartItem.cartCode=this.cartCode;
  //   this.carts.push(this.cartItem);
  // }

  selectCart(cartNumber:number){
    this.cartsItem=this.carts[cartNumber].products;
  }

  showDialogPayment() {
    this.isPayment = false;
    this.dialogPayment = true;
  }

  deleteProductOnCart(code: string){
    this.cartItem.products = this.cartItem.products.filter(x => x.barCode !== code)
  }

  chosseUnit(identity:number){
    console.log(this.unitIndex);
    this.viewBillRequest.detailBills[identity].unitId=this.carts.filter((item)=>item.cartCode===this.cartCode)[0].products[identity].items[this.unitIndex].unitId;
    this.sumPrice-=this.viewBillRequest.detailBills[identity].outPrice;
    this.viewBillRequest.detailBills[identity].outPrice=this.carts.filter((item)=>item.cartCode===this.cartCode)[0].products[identity].items[this.unitIndex].outPrice;
    this.viewBillRequest.detailBills[identity].exportId=this.carts.filter((item)=>item.cartCode===this.cartCode)[0].products[identity].items[this.unitIndex].exportId;
    this.billService.saveBilltoRedis(this.viewBillRequest).subscribe(response=>{
      console.log(response);
    })
  }

  changeAmount(){
    this.billService.saveBilltoRedis(this.viewBillRequest).subscribe(response=>{
      console.log(response);
    })
  }

  transaction(){
    this.transactionRequest=new TransactionBillRequest();
    this.transactionRequest.cartCode=this.cartCode;
    this.transactionRequest.paymentMethod=this.selectedValue;
    this.transactionRequest.transactionType="Thanh Toán";
    this.transactionRequest.inPrice=this.moneyPay;
    this.transactionRequest.language=this.language;
    this.billService.transactionBill(this.transactionRequest).subscribe(response=>{
      this.transactionResponse=response as BaseResponse;
      if (this.transactionResponse.status.status==="1"){
        this.isPayment=true;
        this.dialogPayment=false;
        this.cartsItem=[];
        alert("Thanh toán thành công");
      }
    })
  }
}

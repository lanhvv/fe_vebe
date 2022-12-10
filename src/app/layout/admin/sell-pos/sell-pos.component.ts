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
  totalNumber: number = 0;
  username: string = '';
  orderProduct: any;
  ordersId: any;
  check: any;
  checkList: any;
  moneyPay: any;
  private char: any;
  productResponse!:SearchViewStallResponse;
  products!:ProductStallResult[];
  productSelected!:SelectProductResponse;
  search!:any;
  cartItem!:CartItem;
  carts!:CartItem[];
  index=0;
  cartsItem!:ViewStallResult[];
  selectedUnit!:ExportItem;
  chooseUnit!: string;
  cartCode!:string;

  listBill = [1];
  listDetailBill = [1];
  isButtonPOS = false;
  isPayment = true;
  selectedValue: string = 'money';
  currentBill = 1;
  dialogPayment: boolean = false;

  constructor(
    private translateService: TranslateConfigService,
    private sellOfflineService: SellOfflineService,
    private productService:ProductService,
  ) {
    this.cartsItem=[];
    this.carts=[];
    this.cartCode="CartCode::"+(new Date().getFullYear());
    // console.log(this.cartCode);
    this.cartItem=new CartItem();
    this.cartItem.cartCode=this.cartCode;
    this.carts.push(this.cartItem);
  }

  ngOnInit(): void {
    this.status = 7;
    this.language = this.translateService.getLanguage()!;
    this.toltal = 0;
    this.getTotal();
    if (this.listCart.length === 0) {
      this.checkList = true;
    } else {
      this.checkList = false;
    }
  }

  getTotal() {
    this.listCart = this.sellOfflineService.getListGioHang();
    for (let i = 0; i < this.listCart.length; i++) {
      this.toltal += (this.listCart[i].gia * ((100 - this.listCart[i].promotion) / 100)) * this.listCart[i].productQuantity;
    }
  }

  openDialogDelete(productId: any) {
    this.sellOfflineService.xoaSanPham(productId);
    alert("Xóa thành công")
    this.ngOnInit();
  }

  payment() {
    var listProduct = this.sellOfflineService.getListGioHang();
    console.log(this.listCart);
    for (let i = 0; i < this.listCart.length; i++) {
      var productId = this.listCart[i].masp;
      var productName = this.listCart[i].tensp;

    }

  }

  OpenPayment() {
    if (this.listCart.length === 0) {
      alert("Bạn chưa mua hàng để thanh toán");
    } else {

    }
  }

  numToString(num: number) {
    return num.toLocaleString().split(',').join(this.char || '.');
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
    if (this.selectedValue == 'money') {
      this.isPayment = true;
    } else {
      this.isPayment = false;
    }
  }

  changeBill(index: number) {
    this.currentBill = index;
  }

  getProduct(input:Event){
    console.log(input)
    this.search=input
    this.productService.search(this.language,this.search.filter).subscribe(response=>{
      this.productResponse=response as ViewStallResponse;
      if (this.productResponse.status.status==="1"){
        this.products=this.productResponse.results;
        console.log(this.products)
      }
    })
  }

  selectProduct(id:number){
    this.productService.selectProduct(this.language,id,0).subscribe(response=>{
      this.productSelected=response as SelectProductResponse;
      if (this.productSelected.status.status==="1"){
        this.cartsItem.push(this.productSelected.result);
        this.carts.filter((item)=>item.cartCode===this.cartCode)[0].products=this.cartsItem;
      }
      console.log(this.cartItem.products);
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

  createCart(){
    this.cartCode="CartCode::"+(new Date().getFullYear())
    this.cartItem=new CartItem();
    this.cartItem.cartCode=this.cartCode;
    this.carts.push(this.cartItem);
  }

  selectCart(cartNumber:string){
    this.cartItem=this.carts.filter((item)=>item.cartCode===cartNumber)[0];
  }

  showDialogPayment() {
    this.isPayment = false;
    this.dialogPayment = true;
  }

  deleteProductOnCart(code: string){
    this.cartItem.products = this.cartItem.products.filter(x => x.barCode !== code)
  }
}

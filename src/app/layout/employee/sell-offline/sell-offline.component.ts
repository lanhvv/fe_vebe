import { Component, OnInit } from '@angular/core';
import {SellOfflineService} from "../../../services/employee/sell-offline.service";
import {DeleteAllComponent} from "../delete-all/delete-all.component";
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
@Component({
  selector: 'app-sell-offline',
  templateUrl: './sell-offline.component.html',
  styleUrls: ['./sell-offline.component.css']
})
export class SellOfflineComponent implements OnInit {
  listCart: any = "";
  toltal: number = 0;
  totalNumber: number = 0;
  username: string = '';
  orderProduct: any;
  ordersId:any;
  check:any;
  checkList: any;
  moneyPay: any;
  private char: any;
  productResponse!:SearchViewStallResponse;
  products!:ProductStallResult[];
  productSelected!:SelectProductResponse;
  language!:string;
  search!:any;
  cartItem:CartItem;
  carts:CartItem[];
  index=0;
  cartsItem:ViewStallResult[]
  selectedUnit!:ExportItem;
  cartCode:string;
  status!: number;

  constructor( private sellOfflineService: SellOfflineService,
               private dialog:MatDialog,
               private productService:ProductService,
               private translateService:TranslateConfigService,) {

    this.cartsItem=[];
    this.carts=[];
    this.cartCode="CartCode::"+(new Date().getFullYear())
    console.log(this.cartCode);
    this.cartItem=new CartItem();
    this.cartItem.cartCode=this.cartCode;
    this.carts.push(this.cartItem);
  }

  ngOnInit(): void {
    this.language=this.translateService.getLanguage()!;
    this.status = 2;
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
        console.log("select product:"+this.productSelected.result.productId);
        this.carts.filter((item)=>item.cartCode===this.cartCode)[0].products=this.cartsItem;
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

  createCart(){
    this.cartCode="CartCode::"+(new Date().getFullYear())
    this.cartItem=new CartItem();
    this.cartItem.cartCode=this.cartCode;
    this.carts.push(this.cartItem);
  }

  selectCart(cartNumber:string){
    this.cartItem=this.carts.filter((item)=>item.cartCode===cartNumber)[0];
  }
}

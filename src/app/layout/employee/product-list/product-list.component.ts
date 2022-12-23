import { GetUnit } from './../../../shared/item/product/getUnit';
import { Component, OnInit } from '@angular/core';

import {NgxSpinnerService} from "ngx-spinner";
import {TypeProductService} from "../../../services/type-product/type-product.service";
import {ResponseTypeProducts} from "../../../shared/model/response/ResponseTypeProduct";
import {TypeProduct} from "../../../shared/model/TypeProduct";
import {SellOfflineService} from "../../../services/employee/sell-offline.service";
import {StallServiceService} from "../../../services/employee/stall/stall-service.service";
import {Filter} from "../../../shared/model/Filter";
import {GetProductsRequest} from "../../../shared/model/request/GetProductsRequest";
import {TranslateConfigService} from "../../../services/translate-config.service";
import {ViewStallResponse} from "../../../shared/response/product/ViewStallResponse";
import { ShowListProduct } from '../../../shared/model/response/ShowListProduct';
import { ProductService } from 'src/app/services/employee/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(
    private productService:ProductService,
    private spinner:NgxSpinnerService,
    private typeProductService: TypeProductService,
    private sellOfflineService: SellOfflineService,
    private stallService:StallServiceService,
    private translateService:TranslateConfigService) { }

status: number=0;
products !:ViewStallResponse;
notEmptyPost = true;
notscrolly = true;
numberPage = 0;
searchProduct : string = "";
totalNumber: number = 0;
filter!:Filter;
getProductsRequest!:GetProductsRequest;
page=0;
pageSize=10;
language!:string;
items: ShowListProduct = new ShowListProduct()
units: GetUnit[]=[]
unit: GetUnit= new GetUnit()

ngOnInit(): void {
// this.status = 1;
// this.language=this.translateService.getLanguage()!;
// this.showList()
}
showList(){
this.productService.showProduct().subscribe(response =>{
this.items = response as ShowListProduct;
// console.log(this.items)
// if (this.items == null) {
//   this.notEmptyPost = false;
// } else {
//   this.notscrolly = true;
//   this.numberPage++;
// }
})
}
showUnit(id: number, unitId: number){
this.productService.showUnit(id, unitId).subscribe(response =>{
this.unit = response as GetUnit;
console.log(this.units)
})
}

// onScroll() {
//    if (this.notscrolly && this.notEmptyPost) {
//       this.spinner.show();
//       this.notscrolly = false;
//       this.showList()
//    }
// }



//types !:ResponseTypeProducts;
selectedType : number = -1;

types : TypeProduct[] = [{id: -1, name: "Tất cả" }];

// loadTypeProducts(){
// this.typeProductService.getAll().subscribe(data => {
// let typeData = data as ResponseTypeProducts;
// for (let i = 0; i < typeData.typeProducts.length; i++) {
// this.types.push(typeData.typeProducts[i]);
// }
// //console.log(this.types);
// });
// }


// onClick(){
// //this.searchProduct = "";
// this.notEmptyPost = true;
// this.notscrolly = true;
// // this.loadGetProductByType();
// }


// //search
// onSearch() {
// this.numberPage = 0;
// // this.selectedType = -1;
// // this.selectedValue = this.typePrices[0].price;
// // this.loadProductByName();
// };

// loadProductByName() {
//   this.products.results = [];
//   this.productService.getProduct(this.selectedType, this.selectedValue, this.searchProduct,this.numberPage).subscribe(response =>{
//     this.products = response as ViewStallResponse;
//     this.numberPage++;
//   })
// }

// reloadPage(): void {
// window.location.reload();
// }
// add(productId: number,img: string, productName: string, barCode: string, productPrice: number, amount: number, unit: number, promotion: number, amounWarehouse: number) {
// this.sellOfflineService.addToGioHang(productId,img, productName, barCode, productPrice,1, unit, promotion, amounWarehouse);
// this.totalNumber = this.sellOfflineService.getSoLuongGioHang();
// }
}

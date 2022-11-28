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
import { ProductService } from 'src/app/services/Product/product.service';
// import { ProductService } from 'src/app/services/employee/product/product.service';



class typePrice {
  price!:number;
  title!:string;
}

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  constructor(
              private productService:ProductService,
              private spinner:NgxSpinnerService,
              private typeProductService: TypeProductService,
              private sellOfflineService: SellOfflineService,
              private stallService:StallServiceService,
              private translateService:TranslateConfigService) { }

  status!: number;
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

  ngOnInit(): void {
    this.status = 1;
    this.language=this.translateService.getLanguage()!;
    this.loadInitPost();
    this.loadTypeProducts();
  }

  loadInitPost() {
    this.filter={"typeFilter":"none","valueFilter":"none"}
    this.getProductsRequest={"page":this.page,"pageSize":this.pageSize,"filter":this.filter,"language":this.language,searchText:""};
    this.stallService.view(this.getProductsRequest).subscribe(response =>{
      this.products = response as ViewStallResponse;
      this.numberPage++;
    })
  }

  onScroll() {
     if (this.notscrolly && this.notEmptyPost) {
        this.spinner.show();
        this.notscrolly = false;
        this.loadNextProduct();
     }
  }

  loadNextProduct() {
    this.productService.getProduct(this.selectedType, this.selectedValue, this.searchProduct,this.numberPage).subscribe(data => {
        const newProduct = data as ViewStallResponse;
        this.spinner.hide();
        if (newProduct.results === null) {
          this.notEmptyPost = false;
        } else {
          this.products.results = this.products.results.concat(newProduct.results);
          this.notscrolly = true;
          this.numberPage++;
        }
     });
  }

  //sidebar
  typePrices : typePrice[] = [
    {price:0 , title: "Tất cả"},
    {price:1 , title: "Dưới 50.000đ"},
    {price:2 , title: "50.000 - 200.000"},
    {price:3 , title: "200.000 - 400.000"},
    {price:4 , title: "400.000 - 500.000"},
    {price:5 , title: "Trên 500.000"}
  ];

  //types !:ResponseTypeProducts;
  selectedType : number = -1;
  selectedValue : number = this.typePrices[0].price;

  types : TypeProduct[] = [{id: -1, name: "Tất cả" }];

  loadTypeProducts(){
    this.typeProductService.getAll().subscribe(data => {
      let typeData = data as ResponseTypeProducts;
      for (let i = 0; i < typeData.typeProducts.length; i++) {
        this.types.push(typeData.typeProducts[i]);
      }
      //console.log(this.types);
    });
  }

  loadGetProductByType() {
    this.numberPage = 0;
    // this.productService.getTypeProduct
    this.productService.getProduct(this.selectedType, this.selectedValue, this.searchProduct,this.numberPage).subscribe(response =>{
      this.products = response as ViewStallResponse;
      this.numberPage++;
    })
  }

  onClick(){
    //this.searchProduct = "";
    this.notEmptyPost = true;
    this.notscrolly = true;
    this.loadGetProductByType();
  }

  loadGetProductByPrice() {
    this.numberPage = 0;
    // this.productService.getProductsByPrice
    this.productService.getProduct(this.selectedType, this.selectedValue, this.searchProduct,this.numberPage).subscribe(response =>{
      this.products = response as ViewStallResponse;
      this.numberPage++;
    })
  }

  onClickRadio(){
    console.log(this.selectedType);
    //this.searchProduct = "";
    this.notEmptyPost = true;
    this.notscrolly = true;
    this.loadGetProductByPrice();
  };

  //search
  onSearch() {
    this.numberPage = 0;
    // this.selectedType = -1;
    // this.selectedValue = this.typePrices[0].price;
    this.loadProductByName();
  };

  loadProductByName() {
    this.products.results = [];
    this.productService.getProduct(this.selectedType, this.selectedValue, this.searchProduct,this.numberPage).subscribe(response =>{
      this.products = response as ViewStallResponse;
      this.numberPage++;
    })
  }

  reloadPage(): void {
    window.location.reload();
  }
  add(productId: number,img: string, productName: string, barCode: string, productPrice: number, amount: number, unit: number, promotion: number, amounWarehouse: number) {
    this.sellOfflineService.addToGioHang(productId,img, productName, barCode, productPrice,1, unit, promotion, amounWarehouse);
    this.totalNumber = this.sellOfflineService.getSoLuongGioHang();
  }
}

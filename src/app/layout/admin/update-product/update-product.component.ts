import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/shared/model/category.model';
import { ProductStatusItem } from 'src/app/shared/model/ProductStatusItem';
import { UpdateProductRequest } from 'src/app/shared/model/request/UpdateProductRequest';
import { GetDetailProductResponse } from 'src/app/shared/model/response/GetDetailProductResponse';
import { InfoUpdateProductResponse } from 'src/app/shared/model/response/InfoUpdateProductResponse';
import { UpdateProductResponse } from 'src/app/shared/model/response/UpdateProductResponse';
import {ProductService} from "../../../services/admin/product/product.service";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  idLayout!:any;
  isShowForm = false;
  getDetailProductResponse!:GetDetailProductResponse;
  infoUpdateProductResponse!:InfoUpdateProductResponse;
  selectedCategory!: Category;
  selectedStatus!: ProductStatusItem;
  id!:number;
  updateProductRequest!:UpdateProductRequest;
  updateProductResponse!:UpdateProductResponse;
  img!: File;
  checkUpdate=false;
  constructor(private router:ActivatedRoute,private route:Router
              ,private productService:ProductService
  ) {
    this.getDetailProductResponse=new GetDetailProductResponse();
    this.infoUpdateProductResponse=new InfoUpdateProductResponse();
    this.selectedStatus =new ProductStatusItem()
    this.selectedCategory=new Category();
   }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.productService.detail(this.id,"vi").subscribe(response => {
      this.getDetailProductResponse=response as GetDetailProductResponse;
    })
  }

  back(){
    window.history.back();
  }

  info(){
    console.log(this.infoUpdateProductResponse);
    if(this.isShowForm==false && this.checkUpdate==false){
      console.log("test")
    this.productService.infoUpdate(this.id,"vi").subscribe(response=>{
      this.infoUpdateProductResponse=response as InfoUpdateProductResponse;
      this.selectedCategory={"id":this.infoUpdateProductResponse.categoryId,"name":this.infoUpdateProductResponse.categoryName};
      this.selectedStatus={"statusCode":this.infoUpdateProductResponse.statusCode,"statusName":this.infoUpdateProductResponse.statusName};
    })
    this.checkUpdate=true;
  }



  }
  update(){
    this.updateProductRequest={"productId":this.infoUpdateProductResponse.idProd,
                               "barCode":this.infoUpdateProductResponse.barCode,
                               "productName":this.infoUpdateProductResponse.nameProd,
                               "description":this.infoUpdateProductResponse.description,
                               "categoryId":this.selectedCategory.id,
                               "statusCode":this.selectedStatus.statusCode,
                               "language":"vi"}
                               console.log(this.updateProductRequest)
                               console.log(this.img)
    this.productService.update(this.updateProductRequest).subscribe(response=>{
      this.updateProductResponse=response as UpdateProductResponse;
      if(this.updateProductResponse.status.status==='1'){
        if(this.img!=null){
          this.productService.updateImage(this.img, this.updateProductResponse.id).subscribe(result=>{
            this.updateProductResponse=response as UpdateProductResponse;
            alert(this.updateProductResponse.status.message);
          })
        }else{

        }
      }else{
        alert(this.updateProductResponse.status.message);
      }
    })
  }
  changeImg(event: any){
    this.img=event.target.files[0];
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellOfflineService {
  key: any;
  constructor() { }
  getListGioHang(){
    // @ts-ignore
    return JSON.parse(localStorage.getItem("cart"));
  }
  setListGioHang(list: any){
    localStorage.setItem('cart',JSON.stringify(list));
  }

  addToGioHang(productId: number,img: string, productName: string, barCode: string, price: number, amount: number, unit: number, promotion: number, amountWarehouse: number){
    var currentList = this.getListGioHang();
    if (!currentList){
      currentList= [];
    }
    var daCo =false;
    var quantitytest = 1;
    for (var sp of currentList){
      if (sp.productId == productId){
        sp.productQuantity+= amount;
        daCo = true;
      }
    }
    if(!daCo) {
      currentList.push({
        productId: productId,
        productQuantity: amount,
        tensp: productName,
        barCode: barCode,
        gia: price,
        unit: unit,
        img: img,
        promotion: promotion
      })
    }
    this.setListGioHang(currentList);
  }
  xoaSanPham(masp: number){
    var currentList = this.getListGioHang();
    for (var i =0;i<currentList.length;i++){
      if (currentList[i].productId == masp){
        currentList.splice(i,1);
        break;
      }
    }
    this.capNhatMoiThu(currentList);
  };
  capNhatMoiThu(list: any){
    this.setListGioHang(list);
    this.getListGioHang();
  }
  xoaHet(){
    var currentList = this.getListGioHang();
    currentList = [];
    this.capNhatMoiThu(currentList);
  }
  getSoLuongGioHang():number {
    var currentList = this.getListGioHang();

    var productQuantity = 0;
    if(currentList != null) {
      for(var sp of currentList) {
        productQuantity += sp.productQuantity;
      }
    }

    return productQuantity;
  }
}

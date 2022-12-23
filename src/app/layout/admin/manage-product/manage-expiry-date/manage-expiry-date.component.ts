import { Component, OnInit } from '@angular/core';
import {ExpiredResponse} from "../../../../shared/model/response/ExpiredResponse";
import {Uitem} from "../../../../shared/model/CloseToExpirationItem";
import {EditPriceExportItem} from "../../../../shared/model/EditPriceExportItem";
import {ExpiredService} from "../../../../services/expired/expired.service";
import {MessageService} from "primeng/api";
import {CloseToExpiredService} from "../../../../services/close-to-expired/close-to-expired.service";
import {CloseToExpiresResponse} from "../../../../shared/model/response/CloseToExpiresResponse";
import {EditPriceExportRequest} from "../../../../shared/model/request/EditPriceExportRequest";
import {BehaviorSubject} from "rxjs";
import {BarcodeFormat} from "@zxing/library";

@Component({
  selector: 'app-manage-expiry-date',
  templateUrl: './manage-expiry-date.component.html',
  styleUrls: ['./manage-expiry-date.component.css']
})
export class ManageExpiryDateComponent implements OnInit {

  status: number = 0;
  submitted!: boolean;
  dialog !: boolean;
  page = 0;
  row = 10;
  totalItems = 0;
  nameSearch = "";
  responseExpired !: ExpiredResponse;
  responseToExpired !: CloseToExpiresResponse;

  constructor(private expiredService: ExpiredService,
              private messageService: MessageService,
              private closeToExpiredService: CloseToExpiredService) { }

  ngOnInit(): void {
    this.status = 6;
    this.getALlExpired(this.nameSearch, this.page, this.row);
    this.getALlToExpired(this.nameSearch, this.page, this.row);
  }

  getALlExpired(nameSearch:string, page:number, row:number) {
    this.expiredService.getAll(nameSearch,page,row).subscribe(data => {
      this.responseExpired = data as ExpiredResponse;
      this.totalItems = this.responseExpired.totalItems;
      console.log(this.responseExpired);
    })
  }

  getALlToExpired(nameSearch:string, page:number, row:number) {
    this.closeToExpiredService.getAll(nameSearch,page,row).subscribe(data => {
      this.responseToExpired = data as CloseToExpiresResponse;
      this.totalItems = this.responseToExpired.totalItems;
      console.log(this.responseToExpired);
    })
  }

  paginate(event:any) {
    this.page = event.page;
    this.row = event.rows;
    this.getALlToExpired(this.nameSearch, this.page, this.row);
    this.getALlExpired(this.nameSearch, this.page, this.row);
  }

  hideDialog() {
    this.dialog = false;
    this.submitted = false;
  }

  listUnit !: Uitem[];
  inventory = "";
  listEditExport : EditPriceExportItem[] = [];
  idImport !: number;

  onSearch() {
    this.getALlExpired(this.nameSearch, this.page, this.row);
    this.getALlToExpired(this.nameSearch, this.page, this.row);
  }

  openDialog(idImport:number) {
    this.dialog = true;
    this.submitted = false;

    this.idImport = idImport;
    let list = this.responseToExpired.closeToExpirationItems;
    for (let i = 0; i < list.length; i++) {
      if (idImport === list[i].idImport) {
        this.listUnit = list[i].list;
        this.inventory = list[i].amount;
        break;
      }
    }

    for (let i = 0; i < this.listUnit.length; i++) {
      this.listUnit[i].editAmount = this.listUnit[i].outPrice;
    }
  }

  updateExport() {
    let flag = false;
    for (let i = 0; i < this.listUnit.length; i++) {
      for (let j = i+1; j < this.listUnit.length; j++) {
        if (this.listUnit[i].editAmount < this.listUnit[j].editAmount) {
          console.log((this.listUnit[i].editAmount +"?"+ this.listUnit[j].editAmount));
          flag = true;
          this.messageService.add({severity:'error', summary: 'Thất bại', detail:"Giá trị của " + this.listUnit[i].nameUnit +" không được nhỏ hơn giá trị của "+ this.listUnit[j].nameUnit, life: 5000});
        }
      }
    }

    if (flag === false) {
      for (let i = 0; i < this.listUnit.length; i++) {
        let item = new EditPriceExportItem();
        item.idExport = this.listUnit[i].idExport;
        item.price = this.listUnit[i].editAmount;
        this.listEditExport.push(item);
      }
      let request = new EditPriceExportRequest();
      request.idImport = this.idImport;
      request.list = this.listEditExport;
      this.closeToExpiredService.editPriceExport(request).subscribe(data => {
        this.messageService.add({severity:'success', summary: 'Thành công', detail: 'Đã cập nhập giá!', life: 3000});
        this.hideDialog();
      })
    }
  }
}

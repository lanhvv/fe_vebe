import { Component, OnInit } from '@angular/core';
import {CloseToExpiredService} from "../../../services/close-to-expired/close-to-expired.service";
import {CloseToExpiresResponse} from "../../../shared/model/response/CloseToExpiresResponse";
import {ExportItem, Uitem} from "../../../shared/model/CloseToExpirationItem";
import {EditPriceExportItem} from "../../../shared/model/EditPriceExportItem";
import {EditPriceExportRequest} from "../../../shared/model/request/EditPriceExportRequest";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-manage-unit',
  templateUrl: './manage-close-to-expired.component.html',
  styleUrls: ['./manage-close-to-expired.component.css']
})
export class ManageCloseToExpiredComponent implements OnInit {
  ngOnInit(): void {
    this.getALl(this.nameSearch, this.page, this.row);
  }

  constructor(private closeToExpiredService: CloseToExpiredService,
              private messageService: MessageService) {
  }

  submitted!: boolean;
  dialog !: boolean;
  status: number = 0;
  page = 0;
  row = 10;
  totalItems = 0;
  nameSearch = "";
  response !: CloseToExpiresResponse;

  getALl(nameSearch:string, page:number, row:number) {
    this.closeToExpiredService.getAll(nameSearch,page,row).subscribe(data => {
      this.response = data as CloseToExpiresResponse;
      this.totalItems = this.response.totalItems;
      console.log(this.response);
    })
  }

  paginate(event:any) {
    this.page = event.page;
    this.row = event.rows;
    this.getALl(this.nameSearch, this.page, this.row);
  }

  hideDialog() {
    this.dialog = false;
    this.submitted = false;
  }

  listUnit !: Uitem[];
  inventory = "";
  listEditExport : EditPriceExportItem[] = [];
  idImport !: number;
  openDialog(idImport:number) {
    this.dialog = true;
    this.submitted = false;

    this.idImport = idImport;
    let list = this.response.closeToExpirationItems;
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

  onSearch() {
    this.getALl(this.nameSearch, this.page, this.row);
  }
}

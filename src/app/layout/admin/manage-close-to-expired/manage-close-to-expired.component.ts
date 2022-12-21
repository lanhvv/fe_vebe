import { Component, OnInit } from '@angular/core';
import {CloseToExpiredService} from "../../../services/close-to-expired/close-to-expired.service";
import {CloseToExpiresResponse} from "../../../shared/model/response/CloseToExpiresResponse";
import {ExportItem, Uitem} from "../../../shared/model/CloseToExpirationItem";


@Component({
  selector: 'app-manage-unit',
  templateUrl: './manage-close-to-expired.component.html',
  styleUrls: ['./manage-close-to-expired.component.css']
})
export class ManageCloseToExpiredComponent implements OnInit {
  ngOnInit(): void {
    this.getALl(this.nameSearch, this.page, this.row);
  }

  constructor(private closeToExpiredService: CloseToExpiredService) {
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
      // console.log(this.response);
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
  listEditExport !: ExportItem[];

  openDialog(idImport:number) {
    this.dialog = true;
    this.submitted = false;

    let list = this.response.closeToExpirationItems;
    for (let i = 0; i < list.length; i++) {
      if (idImport === list[i].idImport) {
        this.listUnit = list[i].list;
        this.inventory = list[i].amount;
        break;
      }
    }
  }

  updateExport() {
    console.log(this.listUnit);
  }
}

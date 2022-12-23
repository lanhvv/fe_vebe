import { Component, OnInit } from '@angular/core';
import {ExportItem, Uitem} from "../../../shared/model/CloseToExpirationItem";
import {EditPriceExportItem} from "../../../shared/model/EditPriceExportItem";
import {MessageService} from "primeng/api";
import {ExpiredResponse} from "../../../shared/model/response/ExpiredResponse";
import {ExpiredService} from "../../../services/expired/expired.service";


@Component({
  selector: 'app-manage-unit',
  templateUrl: './manage-expired.component.html',
  styleUrls: ['./manage-expired.component.css']
})
export class ManageExpiredComponent implements OnInit {
  ngOnInit(): void {
    this.getALl(this.nameSearch, this.page, this.row);
  }

  constructor(private expiredService: ExpiredService,
              private messageService: MessageService) {
  }

  submitted!: boolean;
  dialog !: boolean;
  status: number = 0;
  page = 0;
  row = 10;
  totalItems = 0;
  nameSearch = "";
  response !: ExpiredResponse;

  getALl(nameSearch:string, page:number, row:number) {
    this.expiredService.getAll(nameSearch,page,row).subscribe(data => {
      this.response = data as ExpiredResponse;
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

  onSearch() {
    this.getALl(this.nameSearch, this.page, this.row);
  }
}

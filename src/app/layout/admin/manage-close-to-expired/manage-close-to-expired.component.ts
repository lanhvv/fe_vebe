import { Component, OnInit } from '@angular/core';
import {CloseToExpiredService} from "../../../services/close-to-expired/close-to-expired.service";
import {CloseToExpiresResponse} from "../../../shared/model/response/CloseToExpiresResponse";


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

  status: number = 0;
  page = 0;
  row = 10;
  totalItems = 0;
  nameSearch = "";
  response !: CloseToExpiresResponse;

  getALl(nameSearch:string, page:number, row:number) {
    this.closeToExpiredService.getAll(nameSearch,page,row).subscribe(data => {
      this.response = data as CloseToExpiresResponse;
      console.log(this.response);
    })
  }

  paginate(event:any) {
    this.page = event.page;
    this.row = event.rows;
  }

}

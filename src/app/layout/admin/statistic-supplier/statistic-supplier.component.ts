import { Component, OnInit } from '@angular/core';
import {StatisticSupplierService} from "../../../services/statistic-supplier/statistic-supplier.service";
import {StatisticSupplierResponse} from "../../../shared/model/response/StatisticSupplierResponse";
import {AppRoutingModule} from "../../../app-routing.module";
import {
  ActivatedRoute,
  Route, Router,
  RouterEvent,
  RouterLink,
  RouterLinkWithHref,
  RouterModule,
  RouterState,
  Routes
} from "@angular/router";

@Component({
  selector: 'app-manage-unit',
  templateUrl: './statistic-supplier.component.html',
  styleUrls: ['./statistic-supplier.component.css']
})
export class StatisticSupplierComponent implements OnInit {
  status: number = 0;
  name = "";
  page = 0;
  row = 10;
  response !: StatisticSupplierResponse;
  totalItems = 0;

  constructor(private statisticSupplierService:StatisticSupplierService,
              private route:Router) {}

  ngOnInit(): void {
    this.getAll(this.name, this.page, this.row);
  }

  getAll(name:string, page:number, record: number) {
    this.statisticSupplierService.getAll(name, page, record).subscribe(data => {
      this.response = data as StatisticSupplierResponse;
      this.totalItems = this.response.totalItems;
    })
  }

  paginate(event:any) {
    this.page = event.page;
    this.row = event.rows;
    this.getAll(this.name, this.page, this.row);
  }


  click(id:number) {
    this.route.navigate(['admin/import',id])  ;
  }
}

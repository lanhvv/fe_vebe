import { Component, OnInit } from '@angular/core';
import {StatisticStaffService} from "../../../services/statistic-staff/statistic-staff.service";
import {ResponseStatisticStaff} from "../../../shared/model/response/response-statistic-staff";
import {Status} from "../../../shared/model/Status";
import {Filter} from "../../../shared/model/Filter";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  statusPage!: number;
  constructor(private statisticStaff:StatisticStaffService) { }

  statistics !: ResponseStatisticStaff;
  filter!:Filter;

  ngOnInit(): void {
    this.statusPage = 5;
    this.filter={"typeFilter":"","valueFilter":""}
    this.loadOnInit();
  }

  dateValue = new Date();

  page = 0;
  row = 10;

  loadOnInit() {
    this.statisticStaff.getStatisticStaff(this.formatDate(this.dateValue)).subscribe(data => {
      this.statistics = data as ResponseStatisticStaff;
      console.log(this.statistics);
    });
  }

  paginate(event:any) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    console.log(event.page +"-"+ event.rows);
    this.page = event.page;
    this.row = event.rows;
    this.statisticStaff.getStatisticStaffPageable(event.page, event.rows, this.formatDate(this.dateValue), this.filter).subscribe(data => {
      this.statistics = data as ResponseStatisticStaff;
      console.log(this.statistics);
    });
  }

  status !: Status;

  exportExcel() {
    this.page = 0;
    this.row = 10;
    this.statisticStaff.exportExcel(this.page, this.row, this.formatDate(this.dateValue)).subscribe(data => {
        this.status = data as Status;
        if (this.status.status === "1") {
          console.log("success!");
        }
    });
  }

  chooseDate() {
    console.log(this.formatDate(this.dateValue));
    this.statisticStaff.getStatisticStaff(this.formatDate(this.dateValue)).subscribe(data => {
      this.statistics = data as ResponseStatisticStaff;
      console.log(this.statistics);
    });
  }

  formatDate(date:Date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }


  sort(nameFilter:string){
    console.log(nameFilter);
    if(nameFilter==this.filter.typeFilter){
      if(this.filter.valueFilter=="asc"){
        this.filter.valueFilter="desc";
      }else{
        this.filter.valueFilter="asc";
      }
    }
    else{
      this.filter.valueFilter="asc";
      this.filter.typeFilter=nameFilter;
      //this.name = nameFilter;
    }
    console.log(this.filter.typeFilter);
    this.statisticStaff.getStatisticStaffPageable(this.page, this.row, this.formatDate(this.dateValue), this.filter).subscribe(data => {
      this.statistics = data as ResponseStatisticStaff;
      console.log(this.statistics);
    });

  }
}

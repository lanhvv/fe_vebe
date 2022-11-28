import { Component, OnInit } from '@angular/core';
import {TranslateConfigService} from "../../../services/translate-config.service";
import {DashboardService} from "../../../services/admin/dashboard.service";
import {AdminDashboard} from "../../../shared/response/AdminDashboard";
import {Product} from "../../../shared/model/product.model";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  status: number | undefined;

  sumUnconfimred = 0;
  sumPacking = 0;
  sumShipping = 0;
  sumCancel = 0;
  blockProduct: number | undefined = 0;
  soldOutProduct: number | undefined = 0;
  today = new Date();
  lastDay = new Date();
  totalSumPriceOnDay = 0;
  statusSumPrice = "";
  maxDateValue = new Date();

  products?: Product[];

  rangeDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
  invalidDates: Array<Date> | undefined;

  multiAxisData: any;
  multiAxisOptions: any;

  listDate = [];
  startDate?: any;
  endDate?: any;


  constructor(
    private translate: TranslateConfigService,
    private dashboardService: DashboardService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.status = 1;
    this.getReportSumProduct();
    this.getTop5Product();
    this.getReportSumOrder();
    this.getSumPriceOnDay();
    this.setUpDatePicker();
    // this.getCurrentDate(this.rangeDates);

    let today = new Date();
    let firstDate = new Date();
    firstDate.setDate(today.getDate() - 6);
    this.rangeDates = [ firstDate, today];
    this.getCurrentDate(this.datePipe.transform(firstDate,"yyyy-MM-dd"), this.datePipe.transform(today,"yyyy-MM-dd"));
    this.changeObject(this.startDate, this.endDate);
    // this.setUpLineChart(this.listDate);
    this.maxDate = today;
  }

  getReportSumProduct(){
    this.dashboardService.reportSumProduct().subscribe((data: any) =>{
      this.blockProduct = data.block_product;
      this.soldOutProduct = data.sold_out;
    });
  }

  getReportSumOrder(){
    this.dashboardService.reportSumOrder().subscribe((data: any) =>{
      this.sumUnconfimred = data.sumOrderUnConfimred;
      this.sumPacking = data.sumOrderPacking;
      this.sumShipping = data.sumOrderShipping;
      this.sumCancel = data.sumOrderCancel;
    })
  }

  getTop5Product(){
    this.dashboardService.reportTop5Product('vi').subscribe((data: any) =>{
      this.products = data.items;
    })
  }

  setUpDatePicker(){
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month -1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today,invalidDate];
  }

  getSumPriceOnDay(){
    let dateNow = this.datePipe.transform(this.today, 'yyyy-MM-dd');
    let lastDay = this.datePipe.transform(Date.now() + -1*24*3600*1000, 'yyyy-MM-dd');

    this.dashboardService.reportSumPriceOnDay(dateNow, lastDay).subscribe((data: any) =>{
      this.totalSumPriceOnDay = data.sumPriceOnDay;
      this.statusSumPrice = data.statusPrice;
    })
  }

  setUpLineChart(dates: string[]){
    this.multiAxisData = {
      labels: dates,
      // labels: ["12-10-22","13-10-22", "14-10-22", "15-10-22", "16-10-22", "17-10-22","18-10-22"],
      datasets: [{
        label: 'Tổng tiền',
        fill: false,
        borderColor: '#42A5F5',
        yAxisID: 'y',
        tension: .4,
        data: [65, 59, 80, 81, 56, 55, 10]
      }, {
        label: 'Sản phẩm bán được',
        fill: false,
        borderColor: '#00bb7e',
        yAxisID: 'y1',
        tension: .4,
        data: [28, 48, 40, 19, 86, 27, 90]
      }]
    };

    this.multiAxisOptions = {
      stacked: false,
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          ticks: {
            color: '#495057'
          },
          grid: {
            drawOnChartArea: false,
            color: '#ebedef'
          }
        }
      }
    };

  }

  chooseDate() {
    this.startDate = this.datePipe.transform(this.minDate,"yyyy-MM-dd");
    this.endDate = this.datePipe.transform(this.maxDate,"yyyy-MM-dd");
  }

  changeObject(startDate: string, endDate: string){
    this.dashboardService.reportLineChart(startDate, endDate).subscribe((data: any) =>{
      console.log(data.statisticOfDay);
      let item = '';
      for(let i = 0; i < data.statisticOfDay.length; i++){
        item = <string> this.datePipe.transform(data.statisticOfDay[i].date, "dd-MM-yy");
        // @ts-ignore
        this.listDate.push(item);
      }
    })
    this.setUpLineChart(this.listDate);
    console.log(this.listDate);
  }

  getCurrentDate(sd: any, ed: any){
    this.startDate = this.datePipe.transform(sd, "yyyy-MM-dd");
    this.endDate = this.datePipe.transform(ed, "yyyy-MM-dd");
  }

}

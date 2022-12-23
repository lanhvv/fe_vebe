import { Component, OnInit } from '@angular/core';
import {TranslateConfigService} from "../../../services/translate-config.service";
import {DashboardService} from "../../../services/admin/dashboard.service";
import {AdminDashboard} from "../../../shared/response/AdminDashboard";
import {Product} from "../../../shared/model/product.model";
import { DatePipe } from '@angular/common';
import {ValidateLoginService} from "../../../services/validate-login.service";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  status: number | undefined;

  // sumUnconfimred = 0;
  // sumPacking = 0;
  // sumShipping = 0;
  // sumCancel = 0;
  blockProduct: number | undefined = 0;
  soldOutProduct: number | undefined = 0;
  today = new Date();
  lastDay = new Date();
  totalSumPriceOnDay = 0;
  interestRate = 0;
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

  author: string | null = this.tokenStorage.getToken();

  constructor(
    private translate: TranslateConfigService,
    private dashboardService: DashboardService,
    private datePipe: DatePipe,
    private checkRole: ValidateLoginService,
    private tokenStorage: TokenStorageService) {
    // this.checkRole.checkToken(this.author);
  }

  ngOnInit(): void {
    this.status = 1;
    this.getReportSumProduct();
    this.getTop5Product();
    // this.getReportSumOrder();
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

  totalCloseToExpired : number | undefined = 0;
  totalExpired : number | undefined = 0;

  getReportSumProduct(){
    this.dashboardService.reportSumProduct().subscribe((data: any) =>{
      console.log("getReportSumProduct:  " + data.block_product +"/"+ data.sold_out);
      this.blockProduct = data.block_product;
      this.soldOutProduct = data.sold_out;
      this.totalExpired = data.totalExpired;
      this.totalCloseToExpired = data.totalCloseToExpired;
    });
  }

  // getReportSumOrder(){
  //   this.dashboardService.reportSumOrder().subscribe((data: any) =>{
  //     this.sumUnconfimred = data.sumOrderUnConfimred;
  //     this.sumPacking = data.sumOrderPacking;
  //     this.sumShipping = data.sumOrderShipping;
  //     this.sumCancel = data.sumOrderCancel;
  //   })
  // }

  getTop5Product(){
    this.dashboardService.reportTop5Product('vi').subscribe((data: any) =>{
      this.products = data.items;
      console.log(data.items);
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

  statusInterestRateOfDay = ""
  percentSumPrice = 0
  percentInterestRate = 0;
  getSumPriceOnDay(){
    let dateNow = this.datePipe.transform(this.today, 'yyyy-MM-dd');
    let lastDay = this.datePipe.transform(Date.now() + -1*24*3600*1000, 'yyyy-MM-dd');

    this.dashboardService.reportSumPriceOnDay(dateNow, lastDay).subscribe((data: any) =>{
      // console.log(data.totalPriceOfDay);
      this.totalSumPriceOnDay = data.totalPriceOfDay;
      this.interestRate = data.interestRateOfDay;
      this.statusSumPrice = data.statusTotalPriceOfDay;
      this.statusInterestRateOfDay = data.statusInterestRateOfDay;
      this.percentSumPrice = data.percentTotalPriceOfDay;
      this.percentInterestRate = data.percentInterestRateOfDay;
      // console.log(this.percentInterestRate +"/"+ this.percentSumPrice);
    })
  }

  setUpLineChart(dates: string[], amounts: number[], sales: number[]){

    let countAmountsEqualZero = 0;
    let countSalesEqualZero = 0

    let amountsOfLineChart = [0];
    let salesOfLineChart = [0];
    console.log(dates);
    this.multiAxisData = {
      labels: dates,
      // labels: ["12-10-22","13-10-22", "14-10-22", "15-10-22", "16-10-22", "17-10-22","18-10-22"],
      datasets: [{
        label: 'Tổng tiền',
        fill: false,
        borderColor: '#42A5F5',
        yAxisID: 'y',
        tension: .4,
        data: salesOfLineChart
      }, {
        label: 'Sản phẩm bán được',
        fill: false,
        borderColor: '#00bb7e',
        yAxisID: 'y1',
        tension: .4,
        data: amountsOfLineChart
      }]
    };

    for (let i = 0; i < dates.length; i++) {
      if (amounts[i] === 0) {
        countAmountsEqualZero++;
      }
      if (sales[i] === 0) {
        countSalesEqualZero++;
      }
    }

    if (countAmountsEqualZero === dates.length) {
      this.multiAxisData.datasets[0].data = null;
    } else {
      this.multiAxisData.datasets[0].data = amounts;
    }

    if (countSalesEqualZero === dates.length) {
      this.multiAxisData.datasets[1].data = null;
    } else {
      this.multiAxisData.datasets[1].data = sales;
    }



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
    console.log(this.startDate + "-" + this.endDate);
    this.changeObject(this.startDate,this.endDate);
  }

  amounts = [];
  sales = [];
  changeObject(startDate: string, endDate: string){
    this.dashboardService.reportLineChart(startDate, endDate).subscribe((data: any) =>{
      console.log(data.statisticOfDay);
      let item = '';
      let amount = 0;
      let sale = 0;
      for(let i = 0; i < data.statisticOfDay.length; i++){
        item = data.statisticOfDay[i].date;
        amount = <number> data.statisticOfDay[i].amount;
        sale = <number> data.statisticOfDay[i].sales;
        // @ts-ignore
        this.listDate.push(item);
        // @ts-ignore
        this.amounts.push(amount);
        // @ts-ignore
        this.sales.push(sale);
      }
      this.setUpLineChart(this.listDate, this.amounts, this.sales);
    })
  }

  getCurrentDate(sd: any, ed: any){
    this.startDate = this.datePipe.transform(sd, "yyyy-MM-dd");
    this.endDate = this.datePipe.transform(ed, "yyyy-MM-dd");
  }

}

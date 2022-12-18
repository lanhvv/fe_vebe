import { Component, OnInit } from '@angular/core';
import {
  ImportOfSupplierService
} from "../../../../services/statistic-supplier/import-of-supplier/import-of-supplier.service";
import {ActivatedRoute, Router, RouterLinkActive} from "@angular/router";
import {ImportOfSupplieResponse} from "../../../../shared/model/response/ImportOfSupplieResponse";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-manage-unit',
  templateUrl: './import-of-statistic.component.html',
  styleUrls: ['./import-of-statistic.component.css']
})
export class ImportOfStatisticComponent implements OnInit {
  idSupplier = 0;

  multiAxisData : any;
  showButtonBar = true;
  multiAxisOptions : any;
  year = new Date();
  startDate !: Date;
  endDate !: Date;
  page = 0;
  row = 10;
  status: number = 0;
  importOfSupplieResponse !: ImportOfSupplieResponse;
  totalItems = 0;

  ngOnInit(): void {
    console.log(this.startDate)
    this.idSupplier = this.activeRoute.snapshot.params['id'];
    this.getImportsOfSupplier(this.idSupplier, this.page, this.row, this.startDate, this.endDate, this.nameSearch);
    this.showLineChart(this.year.getFullYear(), this.idSupplier);
  }

  constructor(private importOfSupplierService : ImportOfSupplierService,
              private activeRoute:ActivatedRoute,
              private route : Router,
              private messageService: MessageService) {
  }

  getImportsOfSupplier(id:number, page:number, row:number, startDate:Date, endDate:Date, nameProduct:string) {
    this.importOfSupplierService.getImportsOfSupplier(id, page, row, startDate, endDate, nameProduct).subscribe(data => {
      this.importOfSupplieResponse = data as ImportOfSupplieResponse;
      console.log(this.importOfSupplieResponse)
      this.totalItems = this.importOfSupplieResponse.totalItems;
    })
  }


  importOfSupplieResponseLineChart !: ImportOfSupplieResponse;
  showLineChart(year:number, id:number) {
    this.importOfSupplierService.getImportsOfSupplierLineChart(year, id).subscribe(data => {
      this.importOfSupplieResponseLineChart = data as ImportOfSupplieResponse;
      this.setUpLineChart(this.importOfSupplieResponseLineChart.lineChart)
    })
  }

  paginate(event:any) {
    this.page = event.page;
    this.row = event.rows;
    this.getImportsOfSupplier(this.idSupplier, this.page, this.row, this.startDate, this.endDate, this.nameSearch);
  }

  setUpLineChart(data:number[]){
    this.multiAxisData = {
      // labels: dates,
      labels: [1,2,3,4,5,6,7,8,9,10,11,12],
      datasets: [{
        label: 'Tổng số lượng nhập hàng tháng',
        fill: false,
        borderColor: '#42A5F5',
        yAxisID: 'y',
        tension: .4,
        data: data
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

  selectedYear() {
    if (this.year !== undefined) {
      this.showLineChart(this.year.getFullYear(), this.idSupplier);
    }
  }


  nameSearch = "";
  onSearch() {
    if (this.startDate != undefined && this.endDate != undefined) {
      if (this.startDate < this.endDate) {
        this.getImportsOfSupplier(this.idSupplier, this.page, this.row, this.startDate, this.endDate, this.nameSearch);
      } else {

        console.log("ádasasdasd")
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Khoảng ngày giá trị bắt đầu phải nhỏ hơn giá trị kết thúc', life: 3000});
      }
    } else {
      this.getImportsOfSupplier(this.idSupplier, this.page, this.row, this.startDate, this.endDate, this.nameSearch);
    }
  }

  backWindow() {
    this.route.navigate(['admin/statistic-supplier'])  ;
  }
}

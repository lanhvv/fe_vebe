import { Component, OnInit } from '@angular/core';
import {
  ImportOfSupplierService
} from "../../../../services/statistic-supplier/import-of-supplier/import-of-supplier.service";
import {ActivatedRoute, Router, RouterLinkActive} from "@angular/router";
import {ImportOfSupplieResponse} from "../../../../shared/model/response/ImportOfSupplieResponse";

@Component({
  selector: 'app-manage-unit',
  templateUrl: './import-of-statistic.component.html',
  styleUrls: ['./import-of-statistic.component.css']
})
export class ImportOfStatisticComponent implements OnInit {
  idSupplier = 0;

  multiAxisData : any;

  multiAxisOptions : any;
  date10 = new Date();
  page = 0;
  row = 10;
  status: number = 0;
  importOfSupplieResponse !: ImportOfSupplieResponse;
  totalItems = 0;

  ngOnInit(): void {
    this.idSupplier = this.route.snapshot.params['id'];
    this.getImportsOfSupplier(this.idSupplier, this.page, this.row);
    this.showLineChart(this.date10.getFullYear(), this.idSupplier);
  }



  constructor(private importOfSupplierService : ImportOfSupplierService,
              private route:ActivatedRoute) {
  }

  getImportsOfSupplier(id:number, page:number, row:number) {
    this.importOfSupplierService.getImportsOfSupplier(id, page, row).subscribe(data => {
      this.importOfSupplieResponse = data as ImportOfSupplieResponse;
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
    this.getImportsOfSupplier(this.idSupplier, this.page, this.row);
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
    if (this.date10 !== undefined) {
      this.showLineChart(this.date10.getFullYear(), this.idSupplier);
    }
  }
}

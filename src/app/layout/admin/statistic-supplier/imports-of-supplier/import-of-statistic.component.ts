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
  ngOnInit(): void {
    this.idSupplier = this.route.snapshot.params['id'];
    this.getImportsOfSupplier(this.idSupplier, this.page, this.row);
  }

  idSupplier = 0;
  page = 0;
  row = 10;
  status: number = 0;
  importOfSupplieResponse !: ImportOfSupplieResponse;

  constructor(private importOfSupplierService : ImportOfSupplierService,
              private route:ActivatedRoute) {
  }

  getImportsOfSupplier(id:number, page:number, row:number) {
    this.importOfSupplierService.getImportsOfSupplier(id, page, row).subscribe(data => {
      this.importOfSupplieResponse = data as ImportOfSupplieResponse;
      console.log(this.importOfSupplieResponse);
    })
  }

}

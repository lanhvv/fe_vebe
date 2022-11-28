import { Component, OnInit } from '@angular/core';
import {Supplier} from "../../../shared/model/supplier.model";
import {ViewChild} from "@angular/core";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DistributorService} from "../../../services/distributor/distributor.service";
import {SupplierResponse} from "../../../shared/model/response/SupplierResponse";
import {TranslateConfigService} from "../../../services/translate-config.service";

@Component({
  selector: 'app-manage-distributor',
  templateUrl: './manage-distributor.component.html',
  styleUrls: ['./manage-distributor.component.css']
})
export class ManageDistributorComponent implements OnInit {
  status: number | undefined;

  supplierResponse !: SupplierResponse;
  closeResult = '';

  supplier!: Supplier;
  language!: string;

  constructor(
    private modalService: NgbModal,
    private distributorService:DistributorService,
    private translateService: TranslateConfigService) {
  }

  ngOnInit(): void {
    this.status = 5;
    this.loadInit();
    this.language = this.translateService.getLanguage()!;
  }

  loadInit() {
    this.distributorService.display().subscribe(data => {
      this.supplierResponse = data as SupplierResponse;
      console.log(this.supplierResponse);
    });
  }


  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  edit(id:number) {
    console.log("edit nef "+id);
  }

  delete(id:number) {
    console.log("edit nef "+id);
    this.distributorService.delete(id).subscribe(data => {
        this.loadInit();
    });
  }

  save() {
    console.log("nane: "+this.supplier.nameSup);
  }
}

import { Component, OnInit } from '@angular/core';
import {Supplier} from "../../../shared/model/supplier.model";
import {ViewChild} from "@angular/core";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DistributorService} from "../../../services/distributor/distributor.service";
import {SupplierResponse} from "../../../shared/model/response/SupplierResponse";
import {TranslateConfigService} from "../../../services/translate-config.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-manage-distributor',
  templateUrl: './manage-distributor.component.html',
  styleUrls: ['./manage-distributor.component.css']
})
export class ManageDistributorComponent implements OnInit {
  regexPhone = /((\+84|0[1|3|5|7|8|9])(\s|)+([0-9]+(\s|){8,9})\b)/;
  regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(?!domain\.web\b)((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  distributorForm!: FormGroup;
  status: number | undefined;
  supplierResponse !: SupplierResponse;
  closeResult = '';
  supplier!: Supplier;
  language!: string;
  isShowDialog: boolean = false;


  constructor(
    private modalService: NgbModal,
    private distributorService:DistributorService,
    private translateService: TranslateConfigService,
    private fb: FormBuilder) {
    this.formDistributor();
  }

  ngOnInit(): void {
    this.status = 5;
    this.loadInit();
    this.language = this.translateService.getLanguage()!;
  }

  formDistributor(){
    this.distributorForm = this.fb.group({
      email: new FormControl('', [
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.pattern(this.regexEmail)
      ]),
      statusDistributor: ['', [Validators.required]],
      fullName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.regexPhone)])
    })
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

import { Component, OnInit } from '@angular/core';
import {Supplier} from "../../../shared/model/supplier.model";
import {ViewChild} from "@angular/core";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DistributorService} from "../../../services/distributor/distributor.service";
import {SupplierResponse} from "../../../shared/model/response/SupplierResponse";
import {TranslateConfigService} from "../../../services/translate-config.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Filter} from "../../../shared/model/Filter";
import {CreateSupplierResponse} from "../../../shared/response/suppplier/CreateSupplierResponse";
import {CreateSupplier} from "../../../shared/model/CreateSupplier";
import {ConfirmationService, MessageService} from "primeng/api";

interface StatusSupplier {
  name: string,
  status: boolean
}

@Component({
  selector: 'app-manage-distributor',
  templateUrl: './manage-distributor.component.html',
  styleUrls: ['./manage-distributor.component.css']
})
export class ManageDistributorComponent implements OnInit {
  // regexPhone = /((\+84|0[1|3|5|7|8|9])(\s|)+([0-9]+(\s|){8,9})\b)/;
  // regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(?!domain\.web\b)((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // distributorForm!: FormGroup;
  // status: number | undefined;
  // supplierResponse !: SupplierResponse;
  // closeResult = '';
  // supplier!: Supplier;
  // language!: string;
  // isShowDialog: boolean = false;
  //
  //
  // constructor(
  //   private modalService: NgbModal,
  //   private distributorService:DistributorService,
  //   private translateService: TranslateConfigService,
  //   private fb: FormBuilder) {
  //   this.formDistributor();
  // }
  //
  // ngOnInit(): void {
  //   this.status = 5;
  //   this.loadInit();
  //   this.language = this.translateService.getLanguage()!;
  // }
  //
  // formDistributor(){
  //   this.distributorForm = this.fb.group({
  //     email: new FormControl('', [
  //       Validators.minLength(5),
  //       Validators.maxLength(100),
  //       Validators.pattern(this.regexEmail)
  //     ]),
  //     statusDistributor: ['', [Validators.required]],
  //     fullName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
  //     address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
  //     phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.regexPhone)])
  //   })
  // }
  //
  // loadInit() {
  //   this.distributorService.display().subscribe(data => {
  //     this.supplierResponse = data as SupplierResponse;
  //     // console.log(this.supplierResponse);
  //   });
  // }
  //
  //
  // open(content: any) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
  //
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }
  //
  // edit(id:number) {
  //   console.log("edit nef "+id);
  // }
  //
  // delete(id:number) {
  //   console.log("edit nef "+id);
  //   this.distributorService.delete(id).subscribe(data => {
  //       this.loadInit();
  //   });
  // }
  //
  // save() {
  //   console.log("nane: "+this.supplier.nameSup);
  // }
  supplierResponse : SupplierResponse = new SupplierResponse();
  closeResult = '';
  createSupplierResponse!:CreateSupplierResponse;
  totalItems !: number;
  supplier : Supplier = new Supplier();
  form : CreateSupplier = new CreateSupplier();
  constructor(private modalService: NgbModal,
              private distributorService:DistributorService,
              private messageService : MessageService,
              private confirmationService : ConfirmationService) {
  }

  ngOnInit(): void {
    this.loadInit();
  }

  search:string = "";
  suppliersActive : number = 0;
  loadInit() {
    this.distributorService.display(this.search, "", this.filter, this.page, this.row).subscribe(data => {
      this.supplierResponse = data as SupplierResponse;
      this.totalItems = this.supplierResponse.totalItems;
      this.suppliersActive = this.supplierResponse.supplierActive;
      console.log(this.supplierResponse);
    });
  }

  delete(id:number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to unlock the selected distributer?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.distributorService.delete(id).subscribe(data => {
          this.loadInit();
        });
      }
    });
  }

  hideDialog() {
    this.supplierDialog = false;
    this.submitted = false;
  }

  saveSupplier() {
    this.submitted = true;
    if (this.form.nameSup?.trim() || this.form.email?.trim() || this.form.address?.trim() || this.form.numberPhone?.trim()) {
      if (this.form.id == null) {
        this.distributorService.save(this.form).subscribe(data => {
          this.createSupplierResponse = data as CreateSupplierResponse;
          // @ts-ignore
          if (this.createSupplierResponse.status.status==1) {
            this.showSuccess("Saved");
            this.submitted = false;
            this.supplierDialog =false;
          } else {
            this.showError(this.createSupplierResponse.status.message);
          }
        });
      } else {
        this.distributorService.update(this.form).subscribe(data => {
          this.createSupplierResponse = data as CreateSupplierResponse;
          // @ts-ignore
          if (this.createSupplierResponse.status.status==1) {
            this.showSuccess("Updated");
            this.loadInit();
            this.submitted = false;
            this.supplierDialog =false;
          } else {
            this.showError(this.createSupplierResponse.status.message);
          }
        });
      }
    }
  }

  openNew() {
    this.form = new CreateSupplier();
    this.submitted = false;
    this.supplierDialog = true;
  }

  openUpdate(id:number) {
    this.submitted = false;
    for (let i = 0; i < this.supplierResponse.supplierItems.length; i++){
      let item :  Supplier = this.supplierResponse.supplierItems[i];
      if (id === item.id) {
        this.form.id = item.id;
        this.form.address = item.address;
        this.form.email = item.email;
        this.form.nameSup = item.nameSup;
        this.form.numberPhone = item.numberPhone;
        this.supplierDialog = true;
      }
    }
  }

  supplierDialog!: boolean;
  submitted!: boolean;

  showSuccess(detail:string) {
    this.messageService.add({severity:'success', summary: 'Success', detail: detail});
  }

  showError(error:string) {
    this.messageService.add({severity:'error', summary: 'Error', detail: error});
  }

  page = 0;
  row = 10;
  paginate(event:any) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    console.log(event.page +"-"+ event.rows);
    this.page = event.page;
    this.row = event.rows;
    this.loadInit();
  }

  filter : Filter = new Filter();

  sort(nameFilter:string) {
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
    }
    this.loadInit();
  }

  onSearch() {
    this.loadInit();
  }
}

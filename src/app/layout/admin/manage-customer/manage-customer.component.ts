import { Component, OnInit } from '@angular/core';
import { GetAccountItemsResponse } from '../../../shared/model/response/getAccountItemsResponse';
import { Router } from '@angular/router';
import { ManagerAccountService } from '../../../services/manager-account/manager-account.service';
import { GetAccountItemsRequest } from '../../../shared/model/request/getAccountItemsRequest';
import {ConfirmationService, MessageService} from "primeng/api";
import {AccountCustomerService} from "../../../services/admin/account-customer/account-customer.service";
import {ResponseAccountCustomer} from "../../../shared/model/response/ResponseAccountCustomer";
import {CreateCustomer} from "../../../shared/model/response/CreateCustomer";
import {CustomerRequest} from "../../../shared/model/request/CustomerRequest";
import {Filter} from "../../../shared/model/Filter";

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.css']
})
export class ManageCustomerComponent implements OnInit {
  constructor(private customerService: AccountCustomerService,
              private messageService : MessageService,
              private confirmationService : ConfirmationService) {
  }

  ngOnInit(): void {
    //this.load();
    this.loadCondition(this.page, this.row, this.search, this.filter, this.selectedStatus);
  }

  customers !: ResponseAccountCustomer;
  customerDialog !: boolean;
  submitted!: boolean;
  totalItems  = 0;

  // load() {
  //   this.customerService.getCustomers().subscribe(data => {
  //     this.customers = data as ResponseAccountCustomer;
  //     this.totalItems = this.customers.totalItems;
  //   })
  // }

  hideDialog() {
    this.customerDialog = false;
    this.submitted = false;
  }

  customerResponse : CreateCustomer = new CreateCustomer();
  customerRequest : CustomerRequest = new CustomerRequest();
  save() {
    this.submitted = true;
    if (this.customerRequest.fullname.trim() || this.customerRequest.numberPhone.trim() || this.customerRequest.cccd.trim() || this.customerRequest.email.trim()) {
      this.customerService.save(this.customerRequest).subscribe(data => {
        this.customerResponse = data as CreateCustomer;
        if (this.customerResponse.status.status == "0") {
          console.log(this.customerResponse);
          this.showError(this.customerResponse.status.message);
        } else {
          this.customerRequest = new CustomerRequest();
          this.submitted = false;
          this.showSuccess("Created success");
          // this.load();
          this.loadCondition(this.page, this.row, this.search, this.filter, this.selectedStatus);
        }
      });
    }
  }

  open() {
    this.customerRequest = new CustomerRequest();
    this.customerDialog = true;
  }


  showSuccess(detail:string) {
    this.messageService.add({severity:'success', summary: 'Success', detail: detail});
  }

  showError(error:string) {
    this.messageService.add({severity:'error', summary: 'Error', detail: error});
  }

  unlock(id:number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to unlock the selected customer?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.customerService.lockAndUnlock(id).subscribe(data => {
          this.showSuccess("Change Success");
          this.loadCondition(this.page, this.row, this.search, this.filter, this.selectedStatus);
        });
      }
    });
  }

  lock(id:number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to lock the selected customer?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.customerService.lockAndUnlock(id).subscribe(data => {
          this.showSuccess("Change Success");
          this.loadCondition(this.page, this.row, this.search, this.filter, this.selectedStatus);
        });
      }
    });
  }
  page = 0;
  row = 10;
  search = "";
  paginate(event:any) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    console.log(event.page +"-"+ event.rows);
    this.page = event.page;
    this.row = event.rows;
    this.loadCondition(this.page, this.row, this.search, this.filter, this.selectedStatus);
  }

  loadCondition(page:number, row:number, search:string, filter:Filter, status:number) {
    this.customerService.getCustomer(this.page, this.row, this.search, filter, status).subscribe(data => {
      this.customers = data as ResponseAccountCustomer;
      this.totalItems = this.customers.totalItems;
    });
  }

  onSearch() {
    this.page = 0;
    this.loadCondition(this.page, this.row, this.search, this.filter, this.selectedStatus);
    console.log(this.search);
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
    this.loadCondition(this.page, this.row, this.search, this.filter, this.selectedStatus);
  }

  nameSort : object[] = [
    {number : 0, name : "fullname"},
    {number : 1, name : "address"},
    {number : 2, name : "numberphone"},
    {number : 3, name : "cccd"},
    {number : 4, name : "email"},
  ];

  selectedStatus : number = 1;

  onStatus() {
    this.page = 0;
    this.loadCondition(this.page, this.row, this.search, this.filter, this.selectedStatus);
  }

}

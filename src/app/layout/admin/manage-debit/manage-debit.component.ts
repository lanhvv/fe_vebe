import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {GetUnitChildResponse} from "../../../shared/model/response/GetUnitChildResponse";
import {InfoUnitItem} from "../../../shared/model/InfoUnitItem";
import {DebitDetailItems} from "../../../shared/model/request/DebitDetailItems";
import {PayRequest} from "../../../shared/model/request/PayRequest";
import {ListPayRequest} from "../../../shared/model/request/ListPayRequest";
import {DebitUserItemsResponse} from "../../../shared/model/response/debitUserItemsResponse";
import {IDebitItems} from "../../../shared/model/iDebitIitems";
import {DebitItemsResponse} from "../../../shared/model/response/debitItemsResponse";
import {GetOrderRequest} from "../../../shared/model/request/getOrderRequest";
import {ListBillItems} from "../../../shared/model/response/ListBillItems";
import {BillItems} from "../../../shared/model/billItems";
import {Filter} from "../../../shared/model/Filter";
import {DebitDetailResponse} from "../../../shared/model/response/debitDetailResponse";
import {CreateDebitRequest} from "../../../shared/model/request/createDebitRequest";
import {UpdateDebitRequest} from "../../../shared/model/request/updateDebitRequest";
import {DebitResponse} from "../../../shared/model/response/debitResponse";
import {DebitService} from "../../../services/employee/debit/debit.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-manage-debit',
  templateUrl: './manage-debit.component.html',
  styleUrls: ['./manage-debit.component.css']
})
export class ManageDebitComponent implements OnInit {

  status: number = 0;
  unitLayouts: any[] = [];
  unitLayout!: any;
  nameSupplier?: string;
  date?: string;
  display: boolean = false;
  uploadedFiles: any[] = [];
  toltal: number = 0;
  updateDebt!: FormGroup;

  listUnit: number[] = [];
  getUnitChileResponse!: GetUnitChildResponse;
  selectedUnitChilds: InfoUnitItem[] = [];

  rangeDates?: Date[];
  debitItems: DebitDetailItems[] = [];
  payRequest!: PayRequest;
  payRequests: ListPayRequest;


  debitUserItemsResponse: DebitUserItemsResponse;

  itemsDebit: IDebitItems[] = [];
  debitItemsResponses: DebitItemsResponse[] = [];
  debitItemsResponse: DebitItemsResponse;
  getOrderRequest!: GetOrderRequest;
  billItems:  ListBillItems;
  billItem:  BillItems;
  page: number = 0;
  pageSize: number = 10;
  filter!: Filter;
  searchText = '';
  dialogVisible!: boolean;
  debitDetail: DebitDetailResponse[] = [];
  createDebitRequest: CreateDebitRequest;

  updateDebitRequest: UpdateDebitRequest;

  editDebitRequest: UpdateDebitRequest;

  debitResponse: DebitResponse
  createDialog!: boolean
  language!: string;
  updateDialog!: boolean
  payDialog!:boolean
  es: any;

  constructor(private debitService: DebitService, private messageService: MessageService) {
    this.debitItemsResponse = new DebitItemsResponse();
    this.createDebitRequest = new CreateDebitRequest();
    this.debitResponse = new DebitResponse();
    this.updateDebitRequest = new UpdateDebitRequest();
    this.payRequest = new PayRequest();
    this.payRequests = new ListPayRequest();
    this.debitUserItemsResponse = new DebitUserItemsResponse();
    this.editDebitRequest = new UpdateDebitRequest();
    this.billItems = new ListBillItems();
    this.billItem = new BillItems();

  }

  ngOnInit(): void {
    this.getallListUser();
    this.getTop10();
    this.status = 12;
  }
  searchByName(request: string) {
    this.searchText = request;
    this.filter = {"typeFilter": "none", "valueFilter": "none"}
    this.getOrderRequest = {
      "page": this.page,
      "pageSize": this.pageSize,
      "filter": this.filter,
      "language": "vi",
      searchText: this.searchText
    };
    this.debitService.listUserDebit(this.getOrderRequest).subscribe((response) => {
      this.debitUserItemsResponse = response as DebitUserItemsResponse;
      console.log(response);
    });
  }
  update(id: number){
    this.updateDebitRequest.billId = this.billItem.id as number
    this.debitService.update(id,this.updateDebitRequest).subscribe(response => {
      this.debitResponse = response as DebitResponse
      if (this.debitResponse.status.status == '1') {
        this.getallListUser()
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: this.debitResponse.status.message, life: 3000 });
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail:this.debitResponse.status.message, life: 3000 });
      }
    })
  }
  getallListUser() {
    this.filter = { typeFilter: 'none', valueFilter: 'none' };
    this.getOrderRequest = {
      page: this.page,
      pageSize: this.pageSize,
      filter: this.filter,
      language: 'vi',
      searchText: this.searchText,
    };
    this.debitService.listUserDebit(this.getOrderRequest).subscribe((response) => {
      this.debitUserItemsResponse = response as DebitUserItemsResponse;
      console.log(response);
    });
  }

  getall(idUser: number) {
    this.filter = { typeFilter: 'none', valueFilter: 'none' };
    this.getOrderRequest = {
      page: this.page,
      pageSize: this.pageSize,
      filter: this.filter,
      language: 'vi',
      searchText: this.searchText,
    };
    this.debitService.getAll(idUser, this.getOrderRequest).subscribe((response) => {
      this.debitItemsResponse = response as DebitItemsResponse;
      console.log(response);
    });
    this.dialogVisible = true;
  }

  getById(request: number) {
    this.debitService.getById(request).subscribe(data => {
      this.billItem.id = data.billId as number
      this.billItem.createDate = data.createDate as Date
      this.billItem.total = data.total
      this.updateDebitRequest = data as UpdateDebitRequest;

      this.payDialog = true;
    });
  }

  getByUpdate(request: number) {
    this.debitService.getById(request).subscribe((data) => {

      this.billItem.id = data.billId as number
      this.billItem.createDate = data.createDate as Date
      this.billItem.total = data.total
      this.updateDebitRequest = data as UpdateDebitRequest;

      this.updateDialog = true;
    });
  }

  getTop10(){
    this.debitService.getTop10().subscribe((response) => {
      this.billItems = response as ListBillItems;
    });
  }

  pay() {
    this.debitService.pay(this.updateDebitRequest.idDebit, this.payRequest).subscribe(response => {
      this.debitResponse = response as DebitResponse
      if (this.debitResponse.status.status == '1') {
        this.getallListUser()
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: this.debitResponse.status.message, life: 3000 });
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail:  this.debitResponse.status.message, life: 3000 });
      }
    })
  }

  create() {
    this.createDebitRequest.billId = this.billItem.id as number
    console.log(this.createDebitRequest.billId)
    this.debitService.create(this.createDebitRequest).subscribe(response => {

      this.debitResponse = response as DebitResponse
      if (this.debitResponse.status.status == '1') {
        this.getallListUser()
        this.messageService.add({ severity: 'success', summary: 'Successful', detail:  this.debitResponse.status.message, life: 3000 });
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail:  this.debitResponse.status.message, life: 3000 });
      }
    })
  }

  openCreate() {
    this.createDialog = true;
  }

  sort(nameFilter: string) {
    if (nameFilter == this.filter.typeFilter) {
      if (this.filter.valueFilter == 'asc') {
        this.filter.valueFilter = 'desc';
      } else {
        this.filter.valueFilter = 'asc';
      }
    } else {
      this.filter.valueFilter = 'asc';
      this.filter.typeFilter = nameFilter;
    }

    this.getOrderRequest = {
      page: this.page,
      pageSize: this.pageSize,
      filter: this.filter,
      language: 'vi',
      searchText: this.searchText,
    };
    this.debitService.listUserDebit(this.getOrderRequest).subscribe((response) => {
      this.debitUserItemsResponse = response as DebitUserItemsResponse;
    });
  }

  Pageable(event: any) {
    this.page = event.page;
    this.pageSize = event.rows;
    this.getallListUser();
  }

  onUpload(event: any) {
    console.log(event)
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

  pushUnit() {
    if (this.listUnit.length == 0) {
      this.listUnit.push(1);
    } else {
      let num = this.listUnit[this.listUnit.length - 1];
      this.listUnit.push(++num);
    }
  }
}

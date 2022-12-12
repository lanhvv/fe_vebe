import { MessageService } from 'primeng/api';
import { DebitResponse } from './../../../shared/model/response/debitResponse';
import { CreateDebitRequest } from './../../../shared/model/request/createDebitRequest';
import { DebitDetailResponse } from './../../../shared/model/response/debitDetailResponse';
import { GetOrderRequest } from './../../../shared/model/request/getOrderRequest';
import { Filter } from './../../../shared/model/Filter';
import { DebitService } from './../../../services/employee/debit/debit.service';
import { DebitItemsResponse } from './../../../shared/model/response/debitItemsResponse';
import { IDebitItems } from './../../../shared/model/iDebitIitems';
import { Component, OnInit } from '@angular/core';
import { DebitDetailItems } from '../../../shared/model/request/DebitDetailItems';
import { GetUnitChildResponse } from '../../../shared/model/response/GetUnitChildResponse';
import { InfoUnitItem } from '../../../shared/model/InfoUnitItem';
import { DetailDebitItems } from 'src/app/shared/model/request/DetailDebitItems';
import { UpdateDebitRequest } from '../../../shared/model/request/updateDebitRequest';
import { PayRequest } from '../../../shared/model/request/PayRequest';
import { ListPayRequest } from '../../../shared/model/request/ListPayRequest';
import { DebitUserItemsResponse } from '../../../shared/model/response/debitUserItemsResponse';

@Component({
  selector: 'app-debit',
  templateUrl: './debit.component.html',
  styleUrls: ['./debit.component.css'],
})
export class DebitComponent implements OnInit {

  unitLayouts: any[] = [];
  unitLayout!: any;
  status: number | undefined;
  nameSupplier?: string;
  date?: string;
  display: boolean = false;
  uploadedFiles: any[] = [];
  toltal: number = 0;

  listUnit: number[] = [];
  getUnitChileResponse!: GetUnitChildResponse;
  selectedUnitChilds: InfoUnitItem[] = [];

  rangeDates?: Date[];
  debitItems: DebitDetailItems[] = []
  payRequest!: PayRequest
  payRequests: ListPayRequest
  value!: Date

  debitUserItemsResponse: DebitUserItemsResponse;

  itemsDebit: IDebitItems[] = [];
  debitItemsResponses: DebitItemsResponse[] = [];
  debitItemsResponse: DebitItemsResponse;
  getOrderRequest!: GetOrderRequest;
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
    this.updateDebitRequest = new UpdateDebitRequest()
    this.payRequest = new PayRequest()
    this.payRequests = new ListPayRequest()
    this.debitUserItemsResponse = new DebitUserItemsResponse();
    this.editDebitRequest = new UpdateDebitRequest()
  }

  ngOnInit(): void {
    this.getallListUser()
  this.value= new Date("Wed Dec 14 2022 00:00:00 GMT+0700 (Indochina Time)")
  }
  // convert() {
  //   var date = new Date(this.updateDebitRequest.expectedDateOfPaymentOfDebt),
  //     mnth = ("0" + (date.getMonth() + 1)).slice(-2),
  //     day = ("0" + date.getDate()).slice(-2);
  //   return [date.getFullYear(), mnth, day].join("-");
  // }

  gettotal(request: number) {
    let sum = 0;
    // for (let index = 0; index < this.createDebitRequest.debitItems.length-1; index++) {
    //  if(this.createDebitRequest.debitItems[index].inPrice== null || this.createDebitRequest.debitItems[index].inPrice ==0){
    //   this.createDebitRequest.debitItems[index].inPrice==0
    //  }
    this.toltal += Number(request) as number
    console.log(request + " dòng76" + this.toltal)
    this.createDebitRequest.totalAmountOwed = this.toltal as number
    // var arrInputs = document.getElementsByTagName("input");
    // for (var i = 0; i < arrInputs.length; i++) {
    //     var oCurInput = arrInputs[i];
    //     if (oCurInput.type == "text")
    //         oCurInput.value = oCurInput.defaultValue;
    // }
    // console.log(this.createDebitRequest.debitItems.length +" dòng76" + this.toltal)
    // console.log(this.createDebitRequest.totalAmountOwed +" dòng97" + this.toltal)
  }
  update(id: number){
    this.debitService.update(id,this.updateDebitRequest).subscribe(response => {
      this.debitResponse = response as DebitResponse
      if (this.debitResponse.status.status == '1') {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Add Account success', life: 3000 });
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Add Account failse', life: 3000 });
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
  //  debitItems!: DetailDebitItems[]
  getById(request: number) {
    this.debitService.getById(request).subscribe((response) => {
      this.updateDebitRequest = response as UpdateDebitRequest;

      this.updateDialog = true;
    });
  }
  getByUpdate(request: number) {
    this.debitService.getById(request).subscribe((response) => {
      this.updateDebitRequest = response as UpdateDebitRequest;

      this.payDialog = true;
    });
  }
  getDetailBill() {
    this.debitService.getDetailBill(this.createDebitRequest.billId).subscribe((response) => {
      this.createDebitRequest.debitItems = response as DetailDebitItems[];
    });
  }
  pay() {

    this.debitService.pay(this.updateDebitRequest.idDebit, this.payRequest).subscribe(response => {
      this.debitResponse = response as DebitResponse
      if (this.debitResponse.status.status == '1') {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Add Account success', life: 3000 });
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Add Account failse', life: 3000 });
      }
    })

  }
  create() {
    this.debitService.create(this.createDebitRequest).subscribe(response => {
      this.debitResponse = response as DebitResponse
      if (this.debitResponse.status.status == '1') {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Add Account success', life: 3000 });
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Add Account failse', life: 3000 });
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

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

@Component({
  selector: 'app-debit',
  templateUrl: './debit.component.html',
  styleUrls: ['./debit.component.css'],
})
export class DebitComponent implements OnInit {

  unitLayouts:any[]=[];
  unitLayout!:any;
  status: number | undefined;
  nameSupplier?: string;
  date ?: string;
  display: boolean = false;
  uploadedFiles: any[] = [];
  toltal: number = 0;

  listUnit: number[] = [];
  getUnitChileResponse!:GetUnitChildResponse;
  selectedUnitChilds: InfoUnitItem[]=[];



  rangeDates?: Date[];
  debitItems: DebitDetailItems[]=[]

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
  debitResponse: DebitResponse
  createDialog!: boolean
  language!:string;
  updateDialog!: boolean
  es: any;
  constructor(private debitService: DebitService, private  messageService: MessageService) {
    this.debitItemsResponse = new DebitItemsResponse();
    this.createDebitRequest = new CreateDebitRequest();
    this.debitResponse = new DebitResponse();
    this.updateDebitRequest = new UpdateDebitRequest()
  }

  ngOnInit(): void {
    this.getall();
  }
  getall() {
    this.filter = { typeFilter: 'none', valueFilter: 'none' };
    this.getOrderRequest = {
      page: this.page,
      pageSize: this.pageSize,
      filter: this.filter,
      language: 'vi',
      searchText: this.searchText,
    };
    this.debitService.getAll(this.getOrderRequest).subscribe((response) => {
      this.debitItemsResponse = response as DebitItemsResponse;
      console.log(response);
    });
  }
  //  debitItems!: DetailDebitItems[]
  getById(request: number) {
    this.debitService.getById(request).subscribe((response) => {
      this.updateDebitRequest = response as UpdateDebitRequest;
      this.updateDialog = true;
    });
  }
  getDetailBill(){
    this.debitService.getDetailBill(this.createDebitRequest.billId).subscribe((response) => {
      this.createDebitRequest.debitItems = response as DetailDebitItems[];
    });
  }
  pay(){
    for (let index = 0; index < this.updateDebitRequest.debitItems.length; index++) {
      this.toltal+= Number(this.updateDebitRequest.debitItems[index].inPrice);

    }
    this.updateDebitRequest.inPrice= this.toltal as number
    this.debitService.pay(this.updateDebitRequest.idDebit,  this.updateDebitRequest).subscribe(response=>{
      this.debitResponse = response as DebitResponse
      if(this.debitResponse.status.status=='1' ){
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Add Account success', life: 3000});
      }
      else{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Add Account failse', life: 3000});
      }
    })

  }
  create() {
    for (let index = 0; index < this.createDebitRequest.debitItems.length; index++) {
      this.toltal+= Number(this.createDebitRequest.debitItems[index].inPrice);

    }
    this.createDebitRequest.totalAmountOwed= this.toltal as number
    console.log(this.createDebitRequest.totalAmountOwed +" dòng97" + this.toltal)
    this.debitService.create(this.createDebitRequest).subscribe(response=>{
      this.debitResponse = response as DebitResponse
      if(this.debitResponse.status.status=='1' ){
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Add Account success', life: 3000});
      }
      else{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Add Account failse', life: 3000});
      }
    })
  }
  openCreate(){
    this.createDialog= true;
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
    this.debitService.getAll(this.getOrderRequest).subscribe((response) => {
      this.debitItemsResponse = response as DebitItemsResponse;
    });
  }
  Pageable(event: any) {
    this.page = event.page;
    this.pageSize = event.rows;
    this.getall();
  }
  onUpload(event: any) {
    console.log(event)
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
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

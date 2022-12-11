import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DebitResponse } from './../../../shared/model/response/debitResponse';
import { CreateDebitRequest } from './../../../shared/model/request/createDebitRequest';
import { DebitDetailResponse } from './../../../shared/model/response/debitDetailResponse';
import { GetOrderRequest } from './../../../shared/model/request/getOrderRequest';
import { Filter } from './../../../shared/model/Filter';
import { DebitService } from './../../../services/employee/debit/debit.service';
import { DebitItemsResponse } from './../../../shared/model/response/debitItemsResponse';
import { IDebitItems } from './../../../shared/model/iDebitIitems';
import { DebitDetailItems } from '../../../shared/model/request/DebitDetailItems';
import { GetUnitChildResponse } from '../../../shared/model/response/GetUnitChildResponse';
import { InfoUnitItem } from '../../../shared/model/InfoUnitItem';
import { DetailDebitItems } from 'src/app/shared/model/request/DetailDebitItems';
import { UpdateDebitRequest } from '../../../shared/model/request/updateDebitRequest';
import { PayRequest } from '../../../shared/model/request/PayRequest';
import { ListPayRequest } from '../../../shared/model/request/ListPayRequest';
import { DebitUserItemsResponse } from '../../../shared/model/response/debitUserItemsResponse';

@Component({
  selector: 'app-user-debit',
  templateUrl: './user-debit.component.html',
  styleUrls: ['./user-debit.component.css']
})
export class UserDebitComponent implements OnInit {
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

  itemsDebit: IDebitItems[] = [];
  debitItemsResponses: DebitItemsResponse[] = [];
  debitUserItemsResponse: DebitUserItemsResponse;
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
  language!: string;
  updateDialog!: boolean
  es: any;
  constructor(private debitService: DebitService, private messageService: MessageService) {
    this.debitUserItemsResponse = new DebitUserItemsResponse();
    this.createDebitRequest = new CreateDebitRequest();
    this.debitResponse = new DebitResponse();
    this.updateDebitRequest = new UpdateDebitRequest()
    this.payRequest = new PayRequest()
    this.payRequests = new ListPayRequest()
  }

  ngOnInit(): void {
    this.getallListUser();
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
  //  debitItems!: DetailDebitItems[]
  getById(request: number) {
    this.debitService.getById(request).subscribe((response) => {
      this.updateDebitRequest = response as UpdateDebitRequest;
      this.updateDialog = true;
    });
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

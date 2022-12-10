import { Component, OnInit } from '@angular/core';
import { GetAccountItemsResponse } from '../../../shared/model/response/getAccountItemsResponse';
import { Router } from '@angular/router';
import { ManagerAccountService } from '../../../services/manager-account/manager-account.service';
import { GetAccountItemsRequest } from '../../../shared/model/request/getAccountItemsRequest';

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.css']
})
export class ManageCustomerComponent implements OnInit {
  status: number | undefined;

  listAccountItems: GetAccountItemsResponse;
  getOrderRequest!: GetAccountItemsRequest;
  page: number = 0;
  pageSize: number =10;
  searchText="";
  totalItems: number = 0;
  totalPages: number =0;
  constructor( private router: Router, private managerAccountService: ManagerAccountService ) {
    this.listAccountItems = new GetAccountItemsResponse();

  }

  ngOnInit(): void {
    this.status = 4;
  }
  getall(){
    this.getOrderRequest={"page":this.page,"pageSize":this.pageSize,"language":"vi",searchText:this.searchText};
    this.managerAccountService.getAll(this.getOrderRequest).subscribe(response => {
      this.listAccountItems = response as GetAccountItemsResponse;
      console.log(response);

    });
  }

}

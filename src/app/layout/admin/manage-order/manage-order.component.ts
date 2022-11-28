import {Component, OnInit, ViewChild} from '@angular/core';
import {IManagerOrder} from '../../../shared/model/orderItems';
import {ManagerOrderService} from 'src/app/services/order/manager-order.service';
import {Filter} from '../../../shared/model/Filter';
import {GetOrderResponse} from '../../../shared/model/response/getOrderResponse';
import {GetOrderRequest} from '../../../shared/model/request/getOrderRequest';
import {GetAllOrder} from '../../../shared/interface/getAllOrder';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})

export class ManageOrderComponent implements OnInit {
  status: number | undefined;

  dateAll: Date | undefined;

  itemsOrder: IManagerOrder[] = [];
  getOrderResponses: GetOrderResponse[] = [];
  getOrderResponse: GetOrderResponse;
  listOrder: GetAllOrder[] = [];
  getOrderRequest!: GetOrderRequest;
  loading: boolean = true;
  page: number = 0;
  pageSize: number = 10;
  count = 0;
  char: any;
  response: any = [];
  searchText = "";
  filter!: Filter;
  totalItems: number = 0;
  totalPages: number = 0;
  searchProduct!: FormGroup;

  addOrder?: boolean;
  text = '7212912912191';
  quantity = 1;


  constructor(
    private orderService: ManagerOrderService,
    private router: Router) {
    this.getOrderResponse = new GetOrderResponse()
  }

  ngOnInit() {
    this.status = 2;
    this.getall();
  }

  getall() {
    this.filter = {"typeFilter": "none", "valueFilter": "none"}
    this.getOrderRequest = {
      "page": this.page,
      "pageSize": this.pageSize,
      "filter": this.filter,
      "language": "vi",
      searchText: this.searchText
    };
    this.orderService.getAll(this.getOrderRequest).subscribe(response => {
      this.getOrderResponse = response as GetOrderResponse;
      console.log(response);

    });
  }

  sort(nameFilter: string) {
    if (nameFilter == this.filter.typeFilter) {
      if (this.filter.valueFilter == "asc") {
        this.filter.valueFilter = "desc";
      } else {
        this.filter.valueFilter = "asc";
      }
    } else {
      this.filter.valueFilter = "asc";
      this.filter.typeFilter = nameFilter;
    }

    this.getOrderRequest = {
      "page": this.page,
      "pageSize": this.pageSize,
      "filter": this.filter,
      "language": "vi",
      searchText: this.searchText
    };
    this.orderService.getAll(this.getOrderRequest).subscribe(response => {
      this.getOrderResponse = response as GetOrderResponse;
    });
  }

  Pageable(event: any) {
    this.page = event.page;
    this.pageSize = event.rows;
    this.getall()
  }

  searchByPhone(request: string) {
    this.searchText = request;
    this.getOrderRequest = {
      "page": this.page,
      "pageSize": this.pageSize,
      "filter": this.filter,
      "language": "vi",
      searchText: this.searchText
    };
    this.orderService.getAllPhone(this.getOrderRequest).subscribe(response => {
      this.getOrderResponse = response as GetOrderResponse;
    });
  }

  searchEnter(request: string) {
    this.searchText = request;
    this.getOrderRequest = {
      "page": this.page,
      "pageSize": this.pageSize,
      "filter": this.filter,
      "language": "vi",
      searchText: this.searchText
    };
    this.orderService.getAll(this.getOrderRequest).subscribe(response => {
      this.getOrderResponse = response as GetOrderResponse;

    });
  }

  getById(id: number) {
    this.router.navigate(['/admin/manage-order-detail/', id]);
  }

  changeStatus(id: number) {
    this.orderService.confirmOrderById(id).subscribe((data) => {
      this.ngOnInit();
    });
  }

  showDialogAddOrder() {
    this.addOrder = true;
  }

  decreaseQuantity() {
    if (this.quantity == 1) {
      this.quantity = 1;
    } else {
      this.quantity -= 1;
    }
  }

  increaseQuantity() {
    let maxValue = 100;
    if (this.quantity == maxValue) {
      this.quantity = maxValue;
    } else {
      this.quantity += 1;
    }
  }

}

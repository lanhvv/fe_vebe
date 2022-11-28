import {Component, OnInit} from '@angular/core';
import {ConfirmationService, ConfirmEventType, MessageService, TreeNode} from "primeng/api";
import {TypeProductService} from "../../../services/type-product/type-product.service";
import {TypeProductItemsResponse} from "../../../shared/model/response/typeProductItemsResponse";
import {CreateResponse} from "../../../shared/model/response/createTypeProductResponse";
import {ActivatedRoute, Router} from "@angular/router";
import {UpdateTypeProductRequest} from "../../../shared/model/request/updateTypeProductRequest";
import {Filter} from "../../../shared/model/Filter";
import {GetOrderRequest} from "../../../shared/model/request/getOrderRequest";
import {TypeItemsResponse} from "../../../shared/model/response/typeItemsResponse";
import {SelectionTypeProductItems} from "../../../shared/model/selectionTypeProductItems";
import {SelectionTypeProductItemsResponse} from "../../../shared/model/response/selectionTypeProductItemsResponse";
import {CreateTypeProductRequest} from "../../../shared/model/request/createTypeProductRequest";
import {CreateTypeProductDetailRequest} from "../../../shared/model/request/createTypeProductDetailRequest";
import {TypeProductItems} from "../../../shared/model/typeProductItems";
import {UpdateTypeProductResponse} from "../../../shared/model/response/updateTypeProductResponse";

@Component({
  selector: 'app-type-product',
  templateUrl: './type-product.component.html',
  styleUrls: ['./type-product.component.css']
})
export class TypeProductComponent implements OnInit {
  files: TypeProductItemsResponse;
  typeResponse: CreateResponse;
  updateTypeProductRequest!: UpdateTypeProductRequest;
  value: any
  dt: any
  filter!: Filter;
  getOrderRequest!: GetOrderRequest;
  page: number = 0;
  pageSize: number = 10;
  response: any = [];
  searchText = "";
  totalItems: number = 0;
  totalPages: number = 0;
  typeItemsResponse: TypeItemsResponse
  display: boolean = false;
  displaydetail: boolean = false;
  updateType: boolean = false;

  category: SelectionTypeProductItems;
  filesType: SelectionTypeProductItemsResponse
  typeRequest: CreateTypeProductRequest
  typeDetailRequest: CreateTypeProductDetailRequest
  selectionTypeProductItems: SelectionTypeProductItems
  typeProductItems: TypeProductItems
  updateTypeProductResponse: UpdateTypeProductResponse

  cols!: any[];
  id: any

  constructor(private typeProductService: TypeProductService, private router: Router, private confirmationService: ConfirmationService,
              private messageService: MessageService, private activatedRoute: ActivatedRoute) {
    this.files = new TypeProductItemsResponse(),
    this.typeResponse = new CreateResponse();
    this.typeItemsResponse = new TypeItemsResponse()
    this.typeRequest = new CreateTypeProductRequest();
    this.category = new SelectionTypeProductItems()
    this.filesType = new SelectionTypeProductItemsResponse()
    this.selectionTypeProductItems = new SelectionTypeProductItems()
    this.typeDetailRequest = new CreateTypeProductDetailRequest()
    this.typeProductItems = new TypeProductItems()
    this.updateTypeProductResponse = new UpdateTypeProductResponse()

  }

  ngOnInit(): void {
    this.getall();
    this.typeProductService.getFilesystem().subscribe((response) =>
      this.filesType = response as SelectionTypeProductItemsResponse
    );

    this.cols = [
      {field: 'name', header: 'Name'},
      {field: 'description', header: 'Description'},
      {field: 'status', header: 'Status'},
      {field: 'amountProduct', header: 'Amount Product'},
      {field: 'creator', header: 'Creator'},
    ];
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
    this.typeProductService.getAllTypeProduct(this.getOrderRequest).subscribe(response => {
      this.files = response as TypeProductItemsResponse
      console.log(this.files)
    });
  }

  delete(request: number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this account?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.typeProductService.delete(request).subscribe(response => {
          this.typeResponse = response as CreateResponse;
          if (this.typeResponse.status.status == '1') {
            this.ngOnInit();
            this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Delete success'});
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Confirmed',
              detail: "this.typeResponse.status.message"
            });
          }
        });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected'});
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled'});
            break;
        }
      }
    });

  }

  update() {
    this.updateTypeProductRequest={"name":this.updateTypeProductResponse.name,"description":this.updateTypeProductResponse.description,
      "parentId": this.updateTypeProductResponse.parentid, "id": this.updateTypeProductResponse.id}
    console.log(this.typeProductItems.Id)
    this.typeProductService.update(this.updateTypeProductRequest).subscribe(responsse => {
      this.typeResponse = responsse as CreateResponse;
      if(this.typeResponse.status.status=='1'){
        this.messageService.add({severity:'success', summary: 'Successful', detail: ' Update success', life: 3000});
      }else {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Update failse', life: 3000});
      }
      this.ngOnInit();
    })
  }

  applyFilterGlobal($event: Event, stringVal: string) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  Pageable(event: any) {
    this.page = event.page;
    this.pageSize = event.rows;
    this.getall()
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

    this.filter = {"typeFilter": "none", "valueFilter": "none"}
    this.getOrderRequest = {
      "page": this.page,
      "pageSize": this.pageSize,
      "filter": this.filter,
      "language": "vi",
      searchText: this.searchText
    };
    this.typeProductService.getAllTypeProduct(this.getOrderRequest).subscribe(response => {
      this.files = response as TypeProductItemsResponse
    });
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
    this.typeProductService.getAllTypeProduct(this.getOrderRequest).subscribe(response => {
      this.files = response as TypeProductItemsResponse
    });
  }

  showDialog() {
    this.display = true;
  }

  create() {
    if (this.files != null) {
      this.typeRequest.parentId == this.category.id as number;
      this.typeRequest.parentId = this.category.id
    } else {
      this.typeRequest.parentId == 0;
    }
    this.typeProductService.create(this.typeRequest).subscribe(response => {
      this.typeResponse = response as CreateResponse;
      if(this.typeResponse.status.status=='1'){
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Add Account success', life: 3000});
      }else {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Add Account failse', life: 3000});
      }
    })

  }
  showDialogDetail(id: number){
    this.typeProductService.detailTypeProductById(id).subscribe(response => {
      this.category = response as SelectionTypeProductItems;
    })
    this.displaydetail= true;
  }
  showDialogDetailUpdate(id: number){
    this.typeProductService.edit(id).subscribe(response => {
      this.updateTypeProductResponse = response as UpdateTypeProductResponse;
    })
    this.updateType= true;
  }
  createDetail() {

    this.typeDetailRequest.id = this.category.id as number;
    this.typeDetailRequest.id = this.category.id
    console.log(this.typeDetailRequest.id)
    this.typeProductService.createDetail(this.typeDetailRequest).subscribe(response => {
      this.typeResponse = response as CreateResponse;
      if(this.typeResponse.status.status=='1'){
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Add Account success', life: 3000});
      }else {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Add Account failse', life: 3000});
      }
      this.ngOnInit();
    })

  }

}

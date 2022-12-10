import {Component, OnInit} from '@angular/core';
import {GetAccountItemsResponse} from '../../../shared/model/response/getAccountItemsResponse';
import {GetAccountItemsRequest} from '../../../shared/model/request/getAccountItemsRequest';
import {Router} from '@angular/router';
import {ManagerAccountService} from '../../../services/manager-account/manager-account.service';
import {DeleteAccountResponse} from "../../../shared/model/response/deleteAccountResponse";
import {ConfirmationService, ConfirmEventType, Message, MessageService} from 'primeng/api';
import {TranslateConfigService} from "../../../services/translate-config.service";

@Component({
  selector: 'admin-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {
  status: number | undefined;

  listAccountItems: GetAccountItemsResponse;
  getOrderRequest!: GetAccountItemsRequest;
  page: number = 0;
  pageSize: number = 10;
  searchText = "";
  totalItems: number = 0;
  totalPages: number = 0;
  language: any;
  msgs: Message[] = [];
  deleteAccountResponse!: DeleteAccountResponse;

  constructor(private router: Router, private managerAccountService: ManagerAccountService, private confirmationService: ConfirmationService,
              private translateService: TranslateConfigService, private messageService: MessageService) {
    this.listAccountItems = new GetAccountItemsResponse();
    this.deleteAccountResponse = new DeleteAccountResponse();
  }

  ngOnInit(): void {
    this.status = 3;
    this.language = this.translateService.getLanguage();
    this.getall();
  }

  getall() {
    this.getOrderRequest = {
      "page": this.page,
      "pageSize": this.pageSize,
      "language": "vi",
      searchText: this.searchText
    };
    this.managerAccountService.getAll(this.getOrderRequest).subscribe(response => {
      this.listAccountItems = response as GetAccountItemsResponse;
    });
  }

  getId(request: number) {
    this.router.navigate(['/admin/manage-update-account', request]);
  }

  delete(request: number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this account?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.managerAccountService.deleteAccount(request).subscribe(response => {
          this.deleteAccountResponse = response as DeleteAccountResponse;
          if (this.deleteAccountResponse.status.status === '1') {
            this.ngOnInit();
            this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Delete success'});
          } else {
            this.messageService.add({severity: 'error', summary: 'Confirmed', detail: 'Delete failse'});
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

  unlockAccount(request: number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this account?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.managerAccountService.unlockAccount(request).subscribe(response => {
          this.deleteAccountResponse = response as DeleteAccountResponse;
          if (this.deleteAccountResponse.status.status === '1') {
            this.ngOnInit();
            this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Unlock success'});
          } else {
            this.messageService.add({severity: 'error', summary: 'Confirmed', detail: 'Unlock failse'});
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

  Pageable(event: any) {
    this.page = event.page;
    this.pageSize = event.rows;
    this.getall()
  }

  searchByUsername(request: string) {
    this.searchText = request;
    this.getOrderRequest = {
      "page": this.page,
      "pageSize": this.pageSize,
      "language": "vi",
      searchText: this.searchText
    };
    this.managerAccountService.getAll(this.getOrderRequest).subscribe(response => {
      this.listAccountItems = response as GetAccountItemsResponse;
    });
  }
}

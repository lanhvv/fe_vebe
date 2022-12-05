import {Component, OnInit} from '@angular/core';
import {GetAccountItemsResponse} from '../../../shared/model/response/getAccountItemsResponse';
import {GetAccountItemsRequest} from '../../../shared/model/request/getAccountItemsRequest';
import {Router} from '@angular/router';
import {ManagerAccountService} from '../../../services/manager-account/manager-account.service';
import {DeleteAccountResponse} from "../../../shared/model/response/deleteAccountResponse";
import {ConfirmationService, ConfirmEventType, Message, MessageService} from 'primeng/api';
import {TranslateConfigService} from "../../../services/translate-config.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CreateAccountResponse} from "../../../shared/model/response/createAccountResponse";
import {CreateAccountRequest} from "../../../shared/model/request/createAccountRequest";

class roleAccount{
  id!: number;
  role!: string;
}
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

  messageUsername: any;
  messageEmail: any;
  messageCccd: any;
  messagePhone: any;
  createAccountRequest: CreateAccountRequest;
  createAccountResponse: CreateAccountResponse;
  isDialogAccount: boolean = false;
  accountForm!: FormGroup;
  roleAccount: roleAccount[];
  regexFullName = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
  regexPassWord = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  regexPhone = /((\+84|0[1|3|5|7|8|9])(\s|)+([0-9]+(\s|){8,9})\b)/;
  regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(?!domain\.web\b)((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(private router: Router,
              private managerAccountService: ManagerAccountService,
              private confirmationService: ConfirmationService,
              private translateService: TranslateConfigService,
              private fb: FormBuilder,
              private messageService: MessageService) {
    this.listAccountItems = new GetAccountItemsResponse();
    this.deleteAccountResponse = new DeleteAccountResponse();
    this.createAccountResponse = new CreateAccountResponse();
    this.createAccountRequest = new CreateAccountRequest();
    this.roleAccount = [
      {id: 1, role: 'Admin'},
      {id: 2, role: 'Staff'}
    ];
    this.formAccount();
  }

  ngOnInit(): void {
    this.status = 3;
    this.language = this.translateService.getLanguage();
    this.getall();
  }

  formAccount(){
    this.accountForm = this.fb.group({
      fullName: new FormControl('', [Validators.minLength(5), Validators.maxLength(50), Validators.required, Validators.pattern(this.regexFullName)]),
      userName: new FormControl('', [Validators.minLength(5), Validators.maxLength(100), Validators.required]),
      passWord: new FormControl('', [Validators.minLength(8), Validators.maxLength(50), Validators.required, Validators.pattern(this.regexPassWord)]),
      cccd: new FormControl('', [Validators.minLength(9), Validators.maxLength(12)]),
      phoneNumber: new FormControl('', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.regexPhone)]),
      email: new FormControl('', [Validators.minLength(5), Validators.maxLength(100), Validators.pattern(this.regexEmail)]),
      address: new FormControl('', [Validators.minLength(10), Validators.maxLength(200)]),
      role: new FormControl('', [Validators.required])
    })
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

  checkAccount() {
    this.managerAccountService.checkAccount(this.createAccountRequest).subscribe(response => {
      this.createAccountResponse = response as CreateAccountResponse;
      if (this.createAccountResponse.status.status == "username" && this.createAccountRequest.username != null) {
        this.messageUsername = this.createAccountResponse.status.message;
      } else if (this.createAccountResponse.status.status == "cccd" && this.createAccountRequest.cccd != null) {
        this.messageCccd = this.createAccountResponse.status.message;
      }
      else if (this.createAccountResponse.status.status == "email" && this.createAccountRequest.email != null) {
        this.messageEmail = this.createAccountResponse.status.message;
      }
      else if (this.createAccountResponse.status.status == "phone" && this.createAccountRequest.numberPhone != null) {
        this.messagePhone = this.createAccountResponse.status.message;
      }
      else if(this.createAccountResponse.status.status == ""&& this.createAccountRequest.numberPhone != null){
        this.messagePhone = this.createAccountResponse.status.message;
      }
      else if(this.createAccountResponse.status.status == ""&& this.createAccountRequest.email != null){
        this.messageEmail = this.createAccountResponse.status.message;
      }
      else if(this.createAccountResponse.status.status == ""&& this.createAccountRequest.cccd != null){
        this.messageCccd = this.createAccountResponse.status.message;
      }
      else if(this.createAccountResponse.status.status == ""&& this.createAccountRequest.username != null){
        this.messageUsername = this.createAccountResponse.status.message;
      }

    })
  }

  createAccount() {
    this.managerAccountService.createAccount(this.createAccountRequest).subscribe(response => {
      this.createAccountResponse = response as CreateAccountResponse;
      if(this.createAccountResponse.status.status='1'){
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Add Account success', life: 3000});
      }else {
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Add Account failse', life: 3000});
      }
    })
    this.isDialogAccount=false;
  }
}

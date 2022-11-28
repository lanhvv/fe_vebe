import {Component, OnInit} from '@angular/core';
import {CreateAccountRequest} from '../../../shared/model/request/createAccountRequest';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {ManagerAccountService} from '../../../services/manager-account/manager-account.service';
import {CreateAccountResponse} from "../../../shared/model/response/createAccountResponse";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-manage-add-account',
  templateUrl: './manage-add-account.component.html',
  styleUrls: ['./manage-add-account.component.css'],
})
export class ManageAddAccountComponent implements OnInit {

  createAccountRequest: CreateAccountRequest;
  messageUsername: any;
  messageEmail: any;
  messageCccd: any;
  messagePhone: any;
  createAccountResponse: CreateAccountResponse;
  status: number | undefined;


  constructor(
    private router: Router,
    private managerAccountService: ManagerAccountService,
    private fb: FormBuilder,private  messageService: MessageService
  ) {
    this.createAccountRequest = new CreateAccountRequest();
    this.createAccountResponse = new CreateAccountResponse();
  }

  validation_messages = {
    fullname: [
      {type: 'required', message: 'Vui lòng nhập tên'},
      {type: 'maxlength', message: 'Vui lòng nhập tên > 40.'},
      {type: 'pattern', message: 'Không được nhập ký tự đặt biệt hoặc số'},
    ],
    username: [
      {type: 'required', message: 'Vui lòng nhập username'},
      {type: 'maxlength', message: 'Vui lòng nhập tên > 40.'},
      {type: 'pattern', message: 'Không được nhập ký tự đặt biệt hoặc số'},
    ],
    password: [
      {type: 'required', message: 'Vui lòng nhập password'},
      {type: 'maxlength', message: 'Vui lòng nhập tên >=6 kí tự.'}
    ],
    cccd: [
      {type: 'required', message: 'Vui lòng nhập CMND'},
      {type: 'pattern', message: 'CMND phải đúng định dạng XXXXXXXXX'},
    ],
    phoneNumber: [
      {type: 'required', message: 'Vui lòng nhập số điện thoại'},
      {
        type: 'pattern',
        message:
          'Vui lòng nhập số địa thoại đúng định dạng 090xxxxxxx or 091xxxxxxx or (84) + 90xxxxxxx or (84) + 91xxxxxxx',
      },
    ],
    address: [{type: 'required', message: 'Vui lòng nhập địa chỉ'}],
    email: [
      {type: 'required', message: 'Vui lòng nhập email'},
      {type: 'maxlength', message: 'Vui lòng nhập email đúng định dạng '},
    ],
  };

  ngOnInit(): void {
    this.status = 3;
  }

  create() {
    this.managerAccountService.createAccount(this.createAccountRequest).subscribe(response => {
      this.createAccountResponse = response as CreateAccountResponse;
      if(this.createAccountResponse.status.status='1'){
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Add Account success', life: 3000});
      }else {
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Add Account failse', life: 3000});
      }

    })
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
}

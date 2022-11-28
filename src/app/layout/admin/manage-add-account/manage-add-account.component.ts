import {Component, OnInit} from '@angular/core';
import {CreateAccountRequest} from '../../../shared/model/request/createAccountRequest';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ManagerAccountService} from '../../../services/manager-account/manager-account.service';
import {CreateAccountResponse} from "../../../shared/model/response/createAccountResponse";
import {MessageService} from "primeng/api";

class roleAccount{
  id!: number;
  role!: string;
}
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
  accountForm!: FormGroup;
  roleAccount: roleAccount[];

  regexFullName = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
  regexPassWord = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  regexPhone = /((\+84|0[1|3|5|7|8|9])(\s|)+([0-9]+(\s|){8,9})\b)/;
  regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(?!domain\.web\b)((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private router: Router,
    private managerAccountService: ManagerAccountService,
    private fb: FormBuilder,
    private  messageService: MessageService
  ) {
    this.createAccountRequest = new CreateAccountRequest();
    this.createAccountResponse = new CreateAccountResponse();
    this.roleAccount = [
      {id: 1, role: 'Admin'},
      {id: 2, role: 'Staff'}
    ]
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

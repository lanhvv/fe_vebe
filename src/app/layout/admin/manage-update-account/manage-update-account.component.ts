import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CreateAccountResponse} from "../../../shared/model/response/createAccountResponse";
import {UpdateAccountRequest} from "../../../shared/model/request/updateAccountRequest";
import {ActivatedRoute, Router} from "@angular/router";
import {ManagerAccountService} from "../../../services/manager-account/manager-account.service";
import {EditAccountRequest} from "../../../shared/model/request/editAccountRequest";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-manage-update-account',
  templateUrl: './manage-update-account.component.html',
  styleUrls: ['./manage-update-account.component.css']
})
export class ManageUpdateAccountComponent implements OnInit {
  id: any;
  updateAccountRequest!: UpdateAccountRequest;
  edit!: EditAccountRequest;
  updateAccount!: FormGroup;
  createAccountResponse!: CreateAccountResponse
  messageUsername: any;
  messageEmail: any;
  messageCccd: any;
  messagePhone: any;
  constructor(private formBuilder: FormBuilder, private router: Router,
              private activatedRoute: ActivatedRoute, private managerAccountService: ManagerAccountService,private  messageService: MessageService) {
    this.createAccountResponse = new CreateAccountResponse();
  }

  ngOnInit(): void {
    this.updateAccount = new FormGroup<any>({
      fullname: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      cccd: new FormControl('', [Validators.required]),
      numberPhone: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z_.0-9]+@+[a-z]+.[a-z]+.[a-z]+/),
      ]),
      address: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
    });
    this.id = this.activatedRoute.snapshot.params['id'];
    this.managerAccountService.editAccount(this.id).subscribe(response => {
      this.updateAccount.patchValue({
        fullname: response.fullname,
        username: response.username,
        numberPhone: response.phoneNumber,
        email: response.email,
        role: response.role,
        address: response.address,
        cccd:  response.cccd,
      });
    });

  }
  update(){
    this.id = this.activatedRoute.snapshot.params['id'];
    const value = this.updateAccount.value;
    this.updateAccountRequest = new UpdateAccountRequest(this.id,value.username, value.fullname, value.password, value.cccd, value.address,
      value.numberPhone, value.email, value.role, 1);
    this.managerAccountService.updateAccount(this.updateAccountRequest).subscribe(response => {
      this.createAccountResponse = response as CreateAccountResponse;
      if(this.createAccountResponse.status.status=="1"){
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Add Account success', life: 3000});
      }
      else if(this.createAccountResponse.status.status=="0") {
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Add Account failse', life: 3000});
      }
    })
  }
  checkError(){
    const value = this.updateAccount.value;
    this.updateAccountRequest = new UpdateAccountRequest(this.id,value.username, value.fullname, value.password, value.cccd, value.address,
      value.numberPhone, value.email, value.role, 1);
    this.managerAccountService.checkAccountUpdate(this.updateAccountRequest).subscribe(response => {
      this.createAccountResponse = response as CreateAccountResponse;
      if (this.createAccountResponse.status.status == "username" && this.updateAccountRequest.username != null) {
        this.messageUsername = this.createAccountResponse.status.message;
      } else if (this.createAccountResponse.status.status == "cccd" && this.updateAccountRequest.cccd != null) {
        this.messageCccd = this.createAccountResponse.status.message;
      }
      else if (this.createAccountResponse.status.status == "email" && this.updateAccountRequest.email != null) {
        this.messageEmail = this.createAccountResponse.status.message;
      }
      else if (this.createAccountResponse.status.status == "phone" && this.updateAccountRequest.numberPhone != null) {
        this.messagePhone = this.createAccountResponse.status.message;
      }
      else if(this.createAccountResponse.status.status == ""&& this.updateAccountRequest.numberPhone != null){
        this.messagePhone = this.createAccountResponse.status.message;
      }
      else if(this.createAccountResponse.status.status == ""&& this.updateAccountRequest.email != null){
        this.messageEmail = this.createAccountResponse.status.message;
      }
      else if(this.createAccountResponse.status.status == ""&& this.updateAccountRequest.cccd != null){
        this.messageCccd = this.createAccountResponse.status.message;
      }
      else if(this.createAccountResponse.status.status == ""&& this.updateAccountRequest.username != null){
        this.messageUsername = this.createAccountResponse.status.message;
      }

    })
  }
}

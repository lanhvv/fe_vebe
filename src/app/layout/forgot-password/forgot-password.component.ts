import { Component, OnInit } from '@angular/core';
import {ForgotPasswordRequest} from "../../shared/model/request/forgotPasswordRequest";
import {EmailResponse} from "../../shared/model/response/emailResponse";
import {ManagerEmailService} from "../../services/manager-public/manager-email.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordRequest:ForgotPasswordRequest;
  emailResponse:EmailResponse;
  constructor( private managerEmailService:ManagerEmailService ,private  messageService: MessageService) {
    this.forgotPasswordRequest = new ForgotPasswordRequest();
    this.emailResponse = new EmailResponse();
  }

  ngOnInit(): void {
  }

  send(){
    this.managerEmailService.forgotPassword(this.forgotPasswordRequest).subscribe(response => {
    this.emailResponse = response as EmailResponse;
    if(this.emailResponse.status.status=="1"){
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Send mail success', life: 3000});
    }
    else {
      this.messageService.add({severity:'error', summary: 'Successful', detail: this.emailResponse.status.message, life: 3000});
    }
    })
  }


}

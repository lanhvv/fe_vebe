import {Component, Input, OnInit} from '@angular/core';
import {TranslateConfigService} from "../../../services/translate-config.service";
import { MessageService } from 'primeng/api';
import { ChangePasswordRequest } from '../../../shared/model/request/changePasswordRequest';
import { BaseResponse } from 'src/app/shared/response/BaseResponse';
import { ProfileService } from 'src/app/services/admin/user/profile.service';

@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderAdminComponent implements OnInit {
  changePasswordRequest!:ChangePasswordRequest
  baseResponse: BaseResponse;


  isDialogChangePass: boolean = false;
  constructor(private translate: TranslateConfigService, private messageService: MessageService, 
    private profileService:ProfileService,) { 
      this.baseResponse = new BaseResponse();
      this.changePasswordRequest = new ChangePasswordRequest()
    }

  @Input() Status: number | undefined;

  ngOnInit(): void {
  }

  changePassWord(){
  //  hàm xử lý, nếu pass thì chạy lệnh này
  this.profileService.changPassword(this.changePasswordRequest).subscribe(response=> {
  this.baseResponse = response as BaseResponse
  if(this.baseResponse.status.status=="1"){
    this.messageService.add({severity:'success', summary: 'Successful', detail:  this.baseResponse.status.message, life: 3000});
        this.isDialogChangePass = false;
        this.changePasswordRequest.oldPassword="";
        this.changePasswordRequest.newPassword="";
        this.changePasswordRequest.reEnterPassword="";
  }
  else{
    this.messageService.add({severity:'error', summary: 'Successful', detail: this.baseResponse.status.message, life: 3000});
        // this.isDialogChangePass = false;
        this.changePasswordRequest.newPassword="";
        this.changePasswordRequest.reEnterPassword="";
  }
  })

  }
}

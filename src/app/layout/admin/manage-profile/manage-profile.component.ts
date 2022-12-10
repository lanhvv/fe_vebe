import { Component, OnInit } from '@angular/core';
import { ProfileRespone } from '../../../shared/model/response/profileRespone';
import { ProfileService } from '../../../services/admin/user/profile.service';
import { ProfileRequest } from '../../../shared/model/request/profileRequest';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BaseResponse } from 'src/app/shared/response/BaseResponse';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent implements OnInit {
  response: ProfileRespone;
  responseProfile!: ProfileRespone[];
  isShowFormEdit: boolean = false;
  request!: ProfileRequest;
  baseResponse!: BaseResponse
  constructor(private profileService: ProfileService, private messageService: MessageService,private confirmationService: ConfirmationService) {
    this.response = new ProfileRespone(),
    this.baseResponse = new BaseResponse()

  }

  ngOnInit(): void {
    this.edit()
  }
  edit(){
   this.profileService.edit().subscribe(response => {
    this.response= response as ProfileRespone

  })
}
  //  fullname!: string;
  cccd!: string;
  address!: string;
  numberPhone! : string;
  email!: string;

  editProfile(){
    this.request = { "fullname": this.response.fullname, "cccd": this.response.cccd,
    "address": this.response.address, "numberPhone": this.response.numberPhone,
     "email": this.response.email
    }
    this.profileService.update(this.request).subscribe(response =>{
    this.baseResponse = response as BaseResponse
    if(this.baseResponse.status.message == "1"){
      this.messageService.add({severity:'success', summary: 'Successful', detail: ' Update success', life: 3000});
    }
    else{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Update failse', life: 3000});
    }
    this.ngOnInit();
    })
    // hàm xử lý thông tin, sau khi edit xong, nếu thành công thì chạy thêm câu lệnh dưới
    this.isShowFormEdit = false;
  }

}

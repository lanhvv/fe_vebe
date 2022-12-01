import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent implements OnInit {

  isShowFormEdit: boolean = false;
  fullname: string = 'Nguyễn Lê Hải';
  email: string = 'hainlph17388@fpt.edu.vn';
  date: string = '21/01/2002';
  cccd: string = '0226784983';
  address: string= 'Cầu Giẽ, xã Đại Xuyên, huyện Phú Xuyên, Hà Nội';

  constructor() { }

  ngOnInit(): void {
  }

  editProfile(){
    // hàm xử lý thông tin, sau khi edit xong, nếu thành công thì chạy thêm câu lệnh dưới
    this.isShowFormEdit = false;
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {TranslateConfigService} from "../../../services/translate-config.service";

@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderAdminComponent implements OnInit {

  isDialogChangePass: boolean = false;
  constructor(private translate: TranslateConfigService) { }

  @Input() Status: number | undefined;

  ngOnInit(): void {
  }

  changePassWord(){
  //  hàm xử lý, nếu pass thì chạy lệnh này
    this.isDialogChangePass = false;
  }
}

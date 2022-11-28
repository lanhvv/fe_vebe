import { Component, OnInit } from '@angular/core';
import {SellOfflineService} from "../../../services/employee/sell-offline.service";

@Component({
  selector: 'app-delete-all',
  templateUrl: './delete-all.component.html',
  styleUrls: ['./delete-all.component.css']
})
export class DeleteAllComponent implements OnInit {

  constructor(private sellOfflineService : SellOfflineService) { }

  ngOnInit(): void {
  }

  delete() {
    this.sellOfflineService.xoaHet();
    alert("Xóa thành công")
  }

}

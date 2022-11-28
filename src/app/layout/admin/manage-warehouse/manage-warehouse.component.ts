import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-manage-warehouse',
  templateUrl: './manage-warehouse.component.html',
  styleUrls: ['./manage-warehouse.component.css']
})
export class ManageWarehouseComponent implements OnInit {

  status: number | undefined;
  nameSupplier?: string;
  date ?: string;
  display: boolean = false;
  uploadedFiles: any[] = [];

  listUnit: number[] = [];

  rangeDates?: Date[];


  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.status = 8;
  }

  showDialog() {
    this.display = true;
  }

  onUpload(event: any) {
    console.log(event)
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  pushUnit() {
    if (this.listUnit.length == 0) {
      this.listUnit.push(1);
    } else {
      let num = this.listUnit[this.listUnit.length - 1];
      this.listUnit.push(++num);
    }
  }

  removeUnit(index: number) {
    this.listUnit = this.listUnit.filter(x => x !== index);
  }

}

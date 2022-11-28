import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import * as XLSX from 'xlsx';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
type AOV = any[][];

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
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  excelForm!: FormGroup;

  constructor(private messageService: MessageService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.status = 8;
  }

  data: AOV = [
    [1, 2],
    [3, 4]
  ];

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

//  upload file
  onFileChange(evt: any){
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOV>XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log(this.data);
      this.excelForm = this.fb.group({
        data: this.fb.array([]),
      });
      const formArray = this.excelForm.get('data') as FormArray;
      for (let i = 1; i < this.data.length; i++) {
        const formGroup = {};
        for (let j = 0; j < this.data[0].length; j++) {
          // @ts-ignore
          formGroup[this.data[0][j]] = [this.data[i][j]];
        }
        formArray.push(this.fb.group(formGroup));
      }
    };
    reader.readAsBinaryString(target.files[0]);
  }
}

import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from "@angular/forms";
type AOV = any[][];

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.css']
})
export class ImportExcelComponent implements OnInit {

  isShowData: boolean = false;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  excelForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.showData();
  }

  data: AOV = [];

  showData(){
    if(this.data.length > 0){
      this.isShowData = true;
    } else{
      this.isShowData = false;
    }
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
    this.isShowData = true;
  }

  get excelFormArray() {
    return this.excelForm.get('data') as FormArray;
  }

  saveData(): void {
    // /* generate worksheet */
    // const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);
    //
    // /* generate workbook and add the worksheet */
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    //
    // /* save to file */
    // XLSX.writeFile(wb, this.fileName);
    console.log(this.excelForm.value);
  }

  changeFile(){
    this.data = [];
    this.isShowData = false;
  }

  getFormGroup(control: AbstractControl) {
    return control as FormGroup;
  }
}

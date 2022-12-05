import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
const htmlToPdfmake = require("html-to-pdfmake");
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
declare var require: any
@Component({
  selector: 'app-print-barcode',
  templateUrl: './print-barcode.component.html',
  styleUrls: ['./print-barcode.component.css']
})
export class PrintBarcodeComponent implements OnInit {
  @ViewChild('pdfBarCode') pdfBarCode!: ElementRef;

  qrvalue: string = '832323828382338'

  status: number | undefined;
  quantity = 1;
  price: number = 0;

  name_product: boolean= false;
  out_price: boolean=true;
  price_with_vnd: boolean = false;
  price_with_unit: boolean = false;
  name_shop: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.status = 6;
  }

  decreaseQuantity() {
    if (this.quantity == 1) {
      this.quantity = 1;
    } else {
      this.quantity -= 1;
    }
  }

  increaseQuantity() {
    let maxValue = 100;
    if (this.quantity == maxValue) {
      this.quantity = maxValue;
    } else {
      this.quantity += 1;
    }
  }

  exportBarCode(){
    const pdfBar = this.pdfBarCode.nativeElement;
    var html = htmlToPdfmake(pdfBar.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download();
  }

}

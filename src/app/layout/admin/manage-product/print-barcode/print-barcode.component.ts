import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-barcode',
  templateUrl: './print-barcode.component.html',
  styleUrls: ['./print-barcode.component.css']
})
export class PrintBarcodeComponent implements OnInit {

  status: number | undefined;
  quantity = 1;
  price: number = 0;
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
}

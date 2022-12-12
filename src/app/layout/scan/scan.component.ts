import {Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, OnDestroy, OnInit} from '@angular/core';
import {BarcodeFormat} from "@zxing/library";
import { ViewChild } from '@angular/core';
import {ZXingScannerComponent} from "@zxing/ngx-scanner";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'vibee-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})


export class ScanComponent implements OnInit, OnDestroy {
  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.enable = false;
  }

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];


  enable : boolean = true;
  hasPermission !: boolean;
  torchEnabled = false;
  tryHarder = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/ ];
  scanner !: ZXingScannerComponent;

  availableDevices !: MediaDeviceInfo[];
  currentDevice !: MediaDeviceInfo;

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
  }

  //get value scan
  qrResultString !: string;
  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    console.log(this.qrResultString);
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onDeviceSelectChange(selected: Event) {
    this.enable = true;
    const device = this.availableDevices.find(x => x.deviceId === this.getValue(selected));
    // @ts-ignore
    this.currentDevice = device;
    console.log(this.currentDevice);
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  getValue(event: Event): string {
    console.log((event.target as HTMLInputElement).value);
    return (event.target as HTMLInputElement).value;
  }

  enableCameraState : boolean = false;
  enableCamera() {
    this.enableCameraState = !this.enableCameraState;
    if (this.enableCameraState) {
      this.enable = true;
      const device = this.availableDevices.find(x => x.deviceId === this.availableDevices[1].deviceId);
      // @ts-ignore
      this.currentDevice = device;
      console.log(this.currentDevice);
    } else {
      this.enable = false;
      // @ts-ignore
      this.currentDevice = undefined;
    }
  }


}

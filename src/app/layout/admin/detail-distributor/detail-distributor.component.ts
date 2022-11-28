import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-detail-distributor',
  templateUrl: './detail-distributor.component.html',
  styleUrls: ['./detail-distributor.component.css']
})
export class DetailDistributorComponent implements OnInit {

  regexPhone = /((\+84|0[1|3|5|7|8|9])(\s|)+([0-9]+(\s|){8,9})\b)/;
  regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(?!domain\.web\b)((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  distributorForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  formDistributor(){
    this.distributorForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.pattern(this.regexEmail)
      ]),
      fullName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.regexPhone)])
    })
  }

}

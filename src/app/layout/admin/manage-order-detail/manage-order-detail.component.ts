import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ManagerOrderService } from '../../../services/order/manager-order.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GetDetailOrder } from '../../../shared/model/response/getDetailOrder';

@Component({
  selector: 'app-manage-order-detail',
  templateUrl: './manage-order-detail.component.html',
  styleUrls: ['./manage-order-detail.component.css']
})
export class ManageOrderDetailComponent implements OnInit {
  id: any;

  listDetailOrder: GetDetailOrder;

  constructor( private ordeService: ManagerOrderService,private formBuilder: FormBuilder, private router: Router,
    private activatedRoute: ActivatedRoute,) {
    this.listDetailOrder = new GetDetailOrder()
    }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.params['id'];
    this.ordeService.getByIdOrder(this.id).subscribe( data => {
      this.listDetailOrder = data as GetDetailOrder;
      console.log(data)
    });

  }
  }


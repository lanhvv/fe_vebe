import {Route} from "@angular/router";
import {ListProductComponent} from "./list-product/list-product.component";
import {ReportComponent} from "./report/report.component";
import { TypeProductComponent } from './type-product/type-product.component';
import { DebitComponent } from './debit/debit.component';

export const EmployeeRouting: Route[] = [
  {
    path: 'employee',
    children: [
      {
        path: 'list-product',
        component: ListProductComponent
      },
      {
        path: 'report',
        component: ReportComponent
      },
      {
        path: 'type-product',
        component: TypeProductComponent
      },//DebitComponent
      {
        path: 'debit',
        component: DebitComponent
      }
    ]
  }
]

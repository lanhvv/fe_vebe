import {Route} from "@angular/router";
import {ListProductComponent} from "./list-product/list-product.component";
import {SellOfflineComponent} from "./sell-offline/sell-offline.component";
import {ReportComponent} from "./report/report.component";
import { TypeProductComponent } from './type-product/type-product.component';

export const EmployeeRouting: Route[] = [
  {
    path: 'employee',
    children: [
      {
        path: 'list-product',
        component: ListProductComponent
      },
      {
        path: 'home',
        component: SellOfflineComponent,
        pathMatch: 'full'
      },
      {
        path: 'report',
        component: ReportComponent
      },
      {
        path: 'sell-offline',
        component: SellOfflineComponent
      },
      {
        path: 'type-product',
        component: TypeProductComponent
      },
    ]
  }
]

import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {EmployeeRouting} from "./employee-routing.module";
import {TranslateModule} from "@ngx-translate/core";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ListProductComponent} from "./list-product/list-product.component";
import {HeaderEmployeeComponent} from "./header/header.component";
import {SidebarEmployeeComponent} from "./sidebar/sidebar.component";
import {FooterEmployeeComponent} from "./footer/footer.component";
import {NgxSpinnerModule} from "ngx-spinner";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {RadioButtonModule} from "primeng/radiobutton";
import { SellOfflineComponent } from './sell-offline/sell-offline.component';
import { ReportComponent } from './report/report.component';
import {ButtonModule} from "primeng/button";
import {PaginatorModule} from "primeng/paginator";
import {CalendarModule} from "primeng/calendar";
import {MatDialogModule} from "@angular/material/dialog";
import { TypeProductComponent } from './type-product/type-product.component';
import {TreeTableModule} from "primeng/treetable";
import {ImageModule} from 'primeng/image';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {DialogModule} from "primeng/dialog";
import {TreeSelectModule} from "primeng/treeselect";
import { ManageOrderComponent } from './manage-order/manage-order.component';
import {CardModule} from "primeng/card";
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { DebitComponent } from './debit/debit.component';
import {CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  declarations: [
    ListProductComponent,
    HeaderEmployeeComponent,
    SidebarEmployeeComponent,
    FooterEmployeeComponent,
    SellOfflineComponent,
    ReportComponent,
    TypeProductComponent,
    ManageOrderComponent,
    ManageProfileComponent,
    DebitComponent
  ],
  imports: [
    RouterModule.forChild(EmployeeRouting),
    TranslateModule,
    TableModule,
    DropdownModule,
    FormsModule,
    CommonModule,
    NgxSpinnerModule,
    InfiniteScrollModule,
    RadioButtonModule,
    ButtonModule,
    PaginatorModule,
    CalendarModule,
    MatDialogModule,
    TreeTableModule,
    ImageModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    TreeSelectModule,
    CardModule,
    ZXingScannerModule,
  ],
  exports:[
    SellOfflineComponent
  ]
})
export class EmployeeModule { }

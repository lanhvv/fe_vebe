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
import { ReportComponent } from './report/report.component';
import {ButtonModule} from "primeng/button";
import {PaginatorModule} from "primeng/paginator";
import {CalendarModule} from "primeng/calendar";
import {MatDialogModule} from "@angular/material/dialog";
import { TypeProductComponent } from './type-product/type-product.component';
import {TreeTableModule} from "primeng/treetable";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {ImageModule} from 'primeng/image';
import {TreeSelectModule} from "primeng/treeselect";
import {DialogModule} from "primeng/dialog";
import { DebitComponent } from './debit/debit.component';
@NgModule({
  declarations: [
    ListProductComponent,
    HeaderEmployeeComponent,
    SidebarEmployeeComponent,
    FooterEmployeeComponent,
    ReportComponent,
    TypeProductComponent,
    DebitComponent,
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
    ConfirmDialogModule,
    ToastModule,
    ImageModule,
    DialogModule,
    TreeSelectModule
  ],
})
export class EmployeeModule { }

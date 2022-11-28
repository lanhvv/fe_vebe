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
import { DeleteAllComponent } from './delete-all/delete-all.component';
import {MatDialogModule} from "@angular/material/dialog";
import { TypeProductComponent } from './type-product/type-product.component';
import {TreeTableModule} from "primeng/treetable";
import {ImageModule} from 'primeng/image';

@NgModule({
  declarations: [
    ListProductComponent,
    HeaderEmployeeComponent,
    SidebarEmployeeComponent,
    FooterEmployeeComponent,
    SellOfflineComponent,
    ReportComponent,
    DeleteAllComponent,
    TypeProductComponent,
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
    ImageModule
  ],
  exports:[
    SellOfflineComponent
  ]
})
export class EmployeeModule { }

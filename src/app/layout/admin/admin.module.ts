import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailProductComponent} from "./detail-product/detail-product.component";
import {ManageCustomerComponent} from "./manage-customer/manage-customer.component";
import {ManageProductComponent} from "./manage-product/manage-product.component";
import {ManageOrderComponent} from "./manage-order/manage-order.component";
import {UpdateProductComponent} from "./update-product/update-product.component";
import {HeaderAdminComponent} from "./header/header.component";
import {FooterAdminComponent} from "./footer/footer.component";
import {ManageAccountComponent} from "./manage-account/manage-account.component";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {TranslateModule} from "@ngx-translate/core";
import { ManageOrderDetailComponent } from './manage-order-detail/manage-order-detail.component';
import {TableModule} from 'primeng/table';
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import {FileUploadModule} from 'primeng/fileupload';
import { ManageDistributorComponent } from './manage-distributor/manage-distributor.component';
import { DetailDistributorComponent } from './detail-distributor/detail-distributor.component';
import { WereHouseManagerComponent } from './WereHouseManager/were-house-manager/were-house-manager.component';
import {PanelModule} from 'primeng/panel';
import { SplitterModule } from 'primeng/splitter';
import {ChartModule} from 'primeng/chart';
import {ToastModule} from 'primeng/toast';
import {TabViewModule} from 'primeng/tabview';
import {RippleModule} from 'primeng/ripple';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import {ProgressBarModule} from 'primeng/progressbar';
import {MultiSelectModule} from 'primeng/multiselect';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {PaginatorModule} from 'primeng/paginator';
import { ManageAddAccountComponent } from './manage-add-account/manage-add-account.component';
import { ManageUpdateAccountComponent } from './manage-update-account/manage-update-account.component';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {CalendarModule} from "primeng/calendar";
import { SellPosComponent } from './sell-pos/sell-pos.component';
import { ReportProductComponent } from './manage-product/report-product/report-product.component';
import { ManageWarehouseComponent } from './manage-warehouse/manage-warehouse.component';
import {RadioButtonModule} from "primeng/radiobutton";
import {InputTextModule} from "primeng/inputtext";
import {DialogModule} from "primeng/dialog";
import {CardModule} from "primeng/card";
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import {ImageModule} from 'primeng/image';
import {ManageUnitComponent} from "./manage-unit/manage-unit.component";

@NgModule({
  declarations: [
    HomeComponent,
    DetailProductComponent,
    ManageCustomerComponent,
    ManageProductComponent,
    ManageOrderComponent,
    UpdateProductComponent,
    HeaderAdminComponent,
    FooterAdminComponent,
    ManageAccountComponent,
    ManageOrderDetailComponent,
    ManageDistributorComponent,
    DetailDistributorComponent,
    WereHouseManagerComponent,
    ManageAddAccountComponent,
    ManageAddAccountComponent,
    ManageUpdateAccountComponent,
    SellPosComponent,
    ReportProductComponent,
    ManageWarehouseComponent,
    ManageProfileComponent,
    ManageUnitComponent
  ],
    imports: [
        CommonModule,
        TranslateModule,
        PaginatorModule,
        TableModule,
        MultiSelectModule,
        DropdownModule,
        HttpClientModule,
        MatTableModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        PaginatorModule,
        FileUploadModule,
        RouterModule,
        PanelModule,
        SplitterModule,
        ChartModule,
        ToastModule,
        TabViewModule,
        RippleModule,
        MessagesModule,
        MessageModule,
        ProgressBarModule,
        ConfirmDialogModule,
        CalendarModule,
        RadioButtonModule,
        InputTextModule,
        DialogModule,
        CardModule,
        ImageModule
    ],
  providers: [ConfirmationService, MessageService],
  exports: [HomeComponent, SellPosComponent]
})
export class AdminModule { }

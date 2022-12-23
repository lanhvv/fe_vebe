import { NgModule } from '@angular/core';
import {Route, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ManageAccountComponent} from "./manage-account/manage-account.component";
import {ManageCustomerComponent} from "./manage-customer/manage-customer.component";
import {ManageProductComponent} from "./manage-product/manage-product.component";
import {ManageOrderComponent} from "./manage-order/manage-order.component";
import {DetailProductComponent} from "./detail-product/detail-product.component";
import {UpdateProductComponent} from "./update-product/update-product.component";
import {ManageOrderDetailComponent} from "./manage-order-detail/manage-order-detail.component";
import {ManageDistributorComponent} from "./manage-distributor/manage-distributor.component";
import {DetailDistributorComponent} from "./detail-distributor/detail-distributor.component";
import { ManageAddAccountComponent } from './manage-add-account/manage-add-account.component';
import {ManageUpdateAccountComponent} from "./manage-update-account/manage-update-account.component";
import {ReportProductComponent} from "./manage-product/report-product/report-product.component";
import {SellPosComponent} from "./sell-pos/sell-pos.component";
import {ManageWarehouseComponent} from "./manage-warehouse/manage-warehouse.component";
import { WereHouseManagerComponent } from './WereHouseManager/were-house-manager/were-house-manager.component';
import {ManageProfileComponent} from "./manage-profile/manage-profile.component";
import {ManageUnitComponent} from "./manage-unit/manage-unit.component";
import {ImportExcelComponent} from "./manage-warehouse/import-excel/import-excel.component";
import {PrintBarcodeComponent} from "./manage-product/print-barcode/print-barcode.component";
// import * as path from "path";
// import * as path from "path";
import {ImportOfStatisticComponent} from "./statistic-supplier/imports-of-supplier/import-of-statistic.component";
import {StatisticSupplierComponent} from "./statistic-supplier/statistic-supplier.component";
import {ManageTypeProductComponent} from "./manage-type-product/manage-type-product.component";
import {ManageDebitComponent} from "./manage-debit/manage-debit.component";
import {ManageCloseToExpiredComponent} from "./manage-close-to-expired/manage-close-to-expired.component";
import {ManageExpiredComponent} from "./manage-expired/manage-expired.component";
import {ManageExpiryDateComponent} from "./manage-product/manage-expiry-date/manage-expiry-date.component";


export const AdminRouting: Route[] = [
  {
    path: 'admin',
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'manage-account',
        component: ManageAccountComponent
      },
      {
        path: 'manage-customer',
        component: ManageCustomerComponent
      },
      {
        path: 'manage-product',
        children: [
          {
            path: '',
            component: ManageProductComponent
          },
          {
            path: 'update-product/:id',
            component: UpdateProductComponent
          },
          {
            path: 'detail-product',
            component: DetailProductComponent
          }
        ]
      },
      {
        path: 'sell-pos',
        component: SellPosComponent
      },
      {
        path: 'detail-product'  ,
        component: DetailProductComponent
      },
      {
        path: 'update-product/:id',
        component: UpdateProductComponent
      },
      {
        path: 'manage-order',
        component: ManageOrderComponent
      },
      {
        path: 'manage-warehouse',
        children: [
          {
            path: '',
            component: ManageWarehouseComponent
          },
          {
            path: 'print-barcode',
            component: PrintBarcodeComponent
          },
          {
            path: 'upload-file',
            component: ImportExcelComponent
          }
        ]
      },
      {
        path: 'manage-order-detail/:id',
        component: ManageOrderDetailComponent
      },
      {
        path: 'report-product/:id',
        component: ReportProductComponent
      },
      {
        path: 'manage-add-account',
        component: ManageAddAccountComponent
      },
      {
        path: 'manage-update-account/:id',
        component: ManageUpdateAccountComponent
      },
      {
        path: 'manage-warehouse/:id',
        component: WereHouseManagerComponent
      },
      {
        path: 'manage-distributor',
        children: [
          {
            path: '',
            component: ManageDistributorComponent
          },
          {
            path: 'detail',
            component: DetailDistributorComponent
          }
        ]
      },
      {
        path:'manage-unit',
        component: ManageUnitComponent
      },
      {
        path:'manager-profile',
        component:ManageProfileComponent
      },
      {
        path: 'manage-type',
        component: ManageTypeProductComponent
      },
      {
        path: 'statistic-supplier',
        component: StatisticSupplierComponent
      },
      {
        path: 'import/:id',
        component: ImportOfStatisticComponent
      },
      {
        path: 'manage-debit',
        component: ManageDebitComponent
      },
      {
        path: 'manage-close-to-expired',
        component: ManageCloseToExpiredComponent
      },
      {
        path: 'manage-expired',
        component: ManageExpiredComponent
      },
      {
        path: 'manage-expiry-date',
        component: ManageExpiryDateComponent
      }
    ]
  }
]

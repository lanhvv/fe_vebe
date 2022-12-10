import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./layout/admin/home/home.component";
import {LoginComponent} from "./layout/login/login.component";
import { RegisterComponent } from './layout/register/register.component';
import {ListProductComponent} from "./layout/employee/list-product/list-product.component";
import { ManageProductComponent } from './layout/admin/manage-product/manage-product.component';
import { AdminRouting } from './layout/admin/admin-routing.module';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: []
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    loadChildren: () => import('./layout/admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: 'admin/home',
    component: HomeComponent
  },
  {
    path: '',
    loadChildren: () => import('./layout/employee/employee.module').then((m) => m.EmployeeModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),RouterModule.forChild(AdminRouting)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

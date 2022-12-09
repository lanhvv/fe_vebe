import { JwtModule } from "@auth0/angular-jwt";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { TableModule } from "primeng/table";
import {PaginatorModule} from 'primeng/paginator';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AdminComponent } from "./layout/admin/admin.component";
import { EmployeeComponent } from "./layout/employee/employee.component";
import { LoginComponent } from "./layout/login/login.component";
import { RegisterComponent } from "./layout/register/register.component";
import{ BrowserModule} from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ForgotPasswordComponent } from './layout/forgot-password/forgot-password.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {  MatPaginatorModule } from '@angular/material/paginator';
import {MultiSelectModule} from 'primeng/multiselect';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import { ProfileComponent } from './layout/profile/profile.component';
import {DialogModule} from 'primeng/dialog';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
import {ScanComponent} from "./layout/scan/scan.component";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import {MatIconModule} from "@angular/material/icon";
import {LoadingComponent} from "./layout/loading/loading.component";

export function rootLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

export function tokenGetter() {
  return window.sessionStorage.getItem("auth-token");
}

@NgModule({
    declarations: [
        AppComponent,
        AdminComponent,
        EmployeeComponent,
        // HeaderAdminComponent,
        // FooterAdminComponent,
        // ManageAccountComponent,
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        ProfileComponent,
        ScanComponent,
        LoadingComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        // AdminRoutingModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        PaginatorModule,
        CalendarModule,
        FormsModule,
        MultiSelectModule,
        MatTableModule,
        HttpClientModule,
        MatButtonModule,
        MatFormFieldModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: rootLoaderFactory,
                deps: [HttpClient]
            }
        }),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                allowedDomains: ["example.com"],
                disallowedRoutes: ["http://example.com/examplebadroute/"],
            },
        }),
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        PaginatorModule,
        NgbModule,
        ToastModule,
        DialogModule,
        MatMenuModule,
        MatListModule,
        ZXingScannerModule,
        MatIconModule
    ],
    providers: [ConfirmationService, MessageService],
    exports: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

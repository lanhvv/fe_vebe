import {Component, ElementRef, OnInit} from '@angular/core';
import {TranslateConfigService} from "../../services/translate-config.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {AuthService} from "../../services/auth.service";
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import {LoginService} from "../../services/login.service";
import {LoginResponse} from "../../shared/response/LoginResponse";
import { ForgotPasswordRequest } from 'src/app/shared/model/request/forgotPasswordRequest';
import { ManagerEmailService } from 'src/app/services/manager-public/manager-email.service';
import { MessageService } from 'primeng/api';
import {BaseResponse} from "../../shared/response/BaseResponse";
import {LoadingService} from "../../services/loading/loading.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  forgotPasswordRequest:ForgotPasswordRequest;
  baseResponse: BaseResponse

  regexUsername = /^[^!#$%^()~&*,/';<>?|:"`]*$/;
  authenticationError = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  language!:string;
  roles: string[] = [];
  loginResponse!:LoginResponse;
  isShowDialogForgotPass: boolean = false;

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    password: ['', [Validators.required, Validators.maxLength(50)]],
    rememberMe: [true],
  });

  constructor(
    private fb: FormBuilder,
    private translate: TranslateConfigService,
    private el: ElementRef,
    private router: Router,
    private loginService: LoginService,
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private translateService:TranslateConfigService,
    private managerEmailService:ManagerEmailService ,
    private messageService: MessageService,
    private loadingService: LoadingService,
  ) {
    this.forgotPasswordRequest = new ForgotPasswordRequest()
    this.baseResponse = new BaseResponse()
  }

  ngOnInit(): void {
    this.language=this.translateService.getLanguage()!;
    if(this.authService.isLoggedIn()){
      // if(this.authService.getRolesFromToken(this.tokenStorage.getToken())){
      // }
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onKeyPress(event: any, regex: any): void {
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  generateToken(){
    this.loadingService.setLoading(true);
    var basicToken= btoa(this.loginForm.get('username')!.value+":"+this.loginForm.get('password')!.value)
    //const { username, password } = this.loginForm;
    this.loginService.generateToken(basicToken,this.language).subscribe(data => {
        this.loginResponse=data as LoginResponse;
          this.tokenStorage.saveToken(this.loginResponse.accessToken);
          this.tokenStorage.saveUser(data);
          this.roles = this.loginResponse.role;
          if(this.roles.includes("ADMIN")){
            this.router.navigate(['/admin'])
              .then(() => {
                this.loadingService.setLoading(false);
              })
            ;
            // this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/employee/home'])
              .then(() => {
                this.loadingService.setLoading(false);
              });
          }
        },
        err => {
          this.loadingService.setLoading(false);
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
  }

  reloadPage(): void {
    window.location.reload();
  }

  private checkRoles(roles: string | string[]){
    if(this.roles.includes('ADMIN')){
      this.router.navigate(['/admin']);
    } else if(this.roles.includes("STAFF")){
      this.router.navigate(['/staff']);
    } else {
      this.router.navigate(['/employee']);
    }
  }

  changePassWord(){
  //  hàm xử lý, code xong nếu pass thì thêm câu lệnh này
    this.isShowDialogForgotPass = false;
  }
  forgotPassWord(){
  //  hàm xử lý, code xong nếu pass thì thêm câu lệnh này
  this.managerEmailService.forgotPassword(this.forgotPasswordRequest).subscribe(response => {
    this.baseResponse = response as BaseResponse;
    if(this.baseResponse.status.status=="1"){
      this.messageService.add({severity:'success', summary: 'Successful', detail: this.baseResponse.status.message, life: 3000});
       this.forgotPasswordRequest.username=""
       this.forgotPasswordRequest.email=""
       this.isShowDialogForgotPass = false;
    }
    else {
      this.messageService.add({severity:'error', summary: 'Successful', detail: this.baseResponse.status.message, life: 3000});
      this.isShowDialogForgotPass = true;
    }
    })

  }

}

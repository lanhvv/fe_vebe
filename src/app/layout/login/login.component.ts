import {Component, ElementRef, OnInit} from '@angular/core';
import {TranslateConfigService} from "../../services/translate-config.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {AuthService} from "../../services/auth.service";
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import {LoginService} from "../../services/login.service";
import {LoginResponse} from "../../shared/response/LoginResponse";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
    private translateService:TranslateConfigService
  ) { }

  ngOnInit(): void {
    this.language=this.translateService.getLanguage()!;
    if(this.authService.isLoggedIn()){
      if(this.authService.getRolesFromToken(this.tokenStorage.getToken())){

      }
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

  login(): void{
    //const { username, password } = this.loginForm;
    this.loginService.login({
      username: this.loginForm.get('username')!.value,
      password: this.loginForm.get('password')!.value,
      // rememberMe: this.loginForm.get('rememberMe')!.value,
    })
      .subscribe(
        data => {
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data);
          this.roles = this.authService.getRolesFromToken(data.token);

          if(this.roles.includes("ADMIN")){
            this.router.navigate(['/admin']);
            console.log("admin")
          } else {
            this.router.navigate(['/employee']);
            console.log("employee")
          }
          // this.reloadPage();
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
  }

  generateToken(){
    var basicToken= btoa(this.loginForm.get('username')!.value+":"+this.loginForm.get('password')!.value)
    //const { username, password } = this.loginForm;
    this.loginService.generateToken(basicToken,this.language).subscribe(data => {
        this.loginResponse=data as LoginResponse;
          this.tokenStorage.saveToken(this.loginResponse.accessToken);
          this.tokenStorage.saveUser(data);
          this.roles = this.loginResponse.role;

          if(this.roles.includes("ADMIN")){
            this.router.navigate(['/admin']);
            console.log("admin")
          } else {
            this.router.navigate(['/employee']);
            console.log("employee")
          }
          // this.reloadPage();
        },
        err => {
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
}

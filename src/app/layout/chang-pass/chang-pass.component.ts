import { Component, OnInit } from '@angular/core';
import {ChangePasswordRequest} from "../../shared/model/request/changePasswordRequest";
import {EmailResponse} from "../../shared/model/response/emailResponse";
import {MessageService} from "primeng/api";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ManagerEmailService} from "../../services/manager-public/manager-email.service";
import {TokenStorageService} from "../../services/token-storage.service";

function checkPassword(input: AbstractControl): ValidationErrors | null {
  if (input.value.newPassword !== input.value.confirmPassword){
    return {checkPassword: true}
  }
  return null;
}
function checkEqualsPassword(input: AbstractControl): ValidationErrors | null {
  if(input.value.oldPassword === input.value.passwordGroup.newPassword){
    return {checkEqualsPassword: true}
  }
  return null;
}
@Component({
  selector: 'app-chang-pass',
  templateUrl: './chang-pass.component.html',
  styleUrls: ['./chang-pass.component.css']
})
export class ChangPassComponent implements OnInit {
  changePasswordRequest!:ChangePasswordRequest
  emailResponse: EmailResponse;
  formChangePassword!: FormGroup;
  constructor( private messageService: MessageService, private managerEmailService:ManagerEmailService, private tokenStorage: TokenStorageService) {
    this.emailResponse = new EmailResponse();

  }
  isOpenToast: boolean = false;
  isSubmit: boolean = false;
  username: string | null = '';




  ngOnInit(): void {
    this.username = this.tokenStorage.getUser().username;
    console.log(this.username)
    this.formChangePassword =  new FormGroup<any>({
      oldPassword: new FormControl('', [Validators.required]),
      passwordGroup: new FormGroup({
        newPassword: new FormControl('', [Validators.required,
          Validators.pattern('^((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&\'()*+,-.:;<=>?@[\\]^_`{|}~]).{6,12})$')]),
        reEnterPassword: new FormControl('', [Validators.required])
      }, [checkPassword])
    }, [checkEqualsPassword]);

  }
  doSubmit(): void{
    this.username = this.tokenStorage.getUser().username;
    const value = this.formChangePassword.value;
    this.changePasswordRequest = new ChangePasswordRequest(value.username, value.oldPassword, value.passwordGroup.newPassword, value.passwordGroup.reEnterPassword);
      this.isSubmit = false;
      this.isOpenToast = false;
      if(this.username !== null){
        this.managerEmailService.changPassword(this.changePasswordRequest).subscribe(result => {
          this.emailResponse = result as EmailResponse
            if(result.message !== 'success'){
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Send mail success', life: 3000});
              this.isOpenToast = true;
            }else{
              this.isOpenToast = false;
              this.messageService.add({severity:'error', summary: 'Successful', detail: 'Send mail success', life: 3000});
            }
          }, error => {
            this.isOpenToast = true;
          })
      }
  }

  get form(){
    return this.formChangePassword.controls;
  }

  get newPassword(){
    return this.formChangePassword.get("passwordGroup.newPassword")
  }

  get confirmPassword(){
    return this.formChangePassword.get("passwordGroup.reEnterPassword")
  }
  hideToast(): void{
    this.isOpenToast = false;
  }
  cancel(){
    // this.router.navigateByUrl("/home").then();
  }

}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Login} from "../core/login/login.model";
import {Observable} from "rxjs";
type JwtToken = {
  id_token: string;
};

const AUTH_API = environment.baseApi;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API: string = 'http://localhost:1507/';
  FIRST_USERNAME: string = 'CTIwGGVDooOmNfUpvsFM';
  FIRST_PASSWORD: string = 'SxbaNxSguVlzGbNlsJep';
  USER_NAME: string = 'bD9EdCjnZHOsH1Wkop4r';
  ROLE: string = 'tSUJTZyGodr7kbSb9Lo8';
  message: string = '';
  username: string | undefined;
  role: string | undefined;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }),
  };

  constructor(private http: HttpClient) { }

  doLogin(username: string, password: string): Observable<any>{
    return this.http.post<any>( environment.baseApi +'login', {
      username: username,
      password: password
    });
  }

    login(credentials: { password: string | null; username: string | null }): Observable<any> {
    return this.http.post(AUTH_API + 'login', credentials,this.httpOptions);
  }

  generateToken(basicToken: string , language: string ){
    return this.http.get(AUTH_API + 'auth/login?language='+language, {headers:
      new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200/',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Authorization': 'Basic ' + basicToken
      }),
    });
  }

  // doChangePassword(username: string, password: string, newPassword: string): Observable<any>{
  //   return this.http.post(this.API + 'change-password', {
  //     username: username,
  //     password: password,
  //     newPassword: newPassword
  //   },{
  //     headers: new HttpHeaders({'Authorization': this.getToken()})
  //   })
  // }

  // saveToken(token: string): void{
  //   this.cookieService.set('Bearer', btoa(token), {expires: 0});
  //   // localStorage.setItem("Token", btoa(token));
  // }
  //
  // getToken(): string{
  //   // let token: string|null = localStorage.getItem('Token');
  //   let token: string = this.cookieService.get('Bearer');
  //   return token === '' ? '' : 'Bearer ' + atob(token);
  // }
  //
  // removeToken(): void{
  //   // localStorage.removeItem("Token");
  //   this.cookieService.delete('Bearer');
  // }
  //
  // saveUserName(username: string): void{
  //   this.cookieService.set(this.USER_NAME, btoa(username), {expires: 0});
  //   // localStorage.setItem('username', username);
  // }
  //
  // getUserName(): string{
  //   let temp = this.cookieService.get(this.USER_NAME);
  //   return temp === '' ? '' : atob(temp);
  //   // return localStorage.getItem('username');
  // }
  //
  // removeUserName(){
  //   this.cookieService.delete(this.USER_NAME);
  // }

  setMessage(message: string): void{
    this.message = message;
  }

  getMessage(): string{
    return this.message;
  }

  // saveRole(role: string){
  //   // localStorage.setItem('role', role);
  //   this.cookieService.set(this.ROLE, btoa(role), {expires: 0});
  // }
  //
  // getRole(): string{
  //   let temp = this.cookieService.get(this.ROLE);
  //   return temp === '' ? '' : atob(temp);
  // }
  //
  // removeRole(){
  //   this.cookieService.delete(this.ROLE);
  // }

  setRememberMe(username: string, password: string, days: number): void{
    this.removeRememberMe();
    let encodeUserName: string = username;
    let encodePassword: string = password;
    for(let i=0; i<11; i++){
      encodeUserName = btoa(encodeUserName);
      encodePassword = btoa(encodePassword);
    }
    encodeUserName = this.FIRST_USERNAME + encodeUserName;
    encodePassword = this.FIRST_PASSWORD + encodePassword;
    let d:Date = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    let expires:string = `expires=${d.toUTCString()}`;
    let cpath:string = ``;
    document.cookie = `${encodeUserName}=${encodePassword}; ${expires}${cpath}`;
  }

  getRememberMe(): any {
    let cookie = this.getCookie();
    if(cookie == null){
      return null;
    }
    let decodeUserName: string = cookie.username;
    let decodePassword: string = cookie.password;
    decodeUserName = decodeUserName.substring(20, decodeUserName.length);
    decodePassword = decodePassword.substring(20, decodePassword.length);
    for (let i=0; i<11; i++){
      decodeUserName = atob(decodeUserName);
      decodePassword = atob(decodePassword);
    }
    return {
      username: decodeUserName,
      password: decodePassword
    }
  }

  removeRememberMe(): void{
    let cookie = this.getCookie();
    if(cookie == null){
      return;
    }
    let encodeUserName: string = cookie.username;
    let d:Date = new Date();
    d.setTime(d.getTime() + (-1 * 24 * 60 * 60 * 1000));
    let expires:string = `expires=${d.toUTCString()}`;
    let cpath:string = ``;
    document.cookie = `${encodeUserName}=; ${expires}${cpath}`;
  }

  getCookie(): any {
    let decodeUserName: string = '';
    let decodePassword: string = '';
    let status: boolean = false;
    let cookie = document.cookie.split('; ');
    for (let i=0; i<cookie.length; i++){
      let temp = cookie[i].split('=');
      if(status){
        break;
      }
      temp.forEach(item => {
        if(item.indexOf(this.FIRST_USERNAME) == 0){
          status = true;
          decodeUserName = item;
        }
        if (item.indexOf(this.FIRST_PASSWORD) == 0){
          status = true;
          decodePassword = item;
        }
      })
    }
    if(!status){
      return null;
    }
    return {
      username: decodeUserName,
      password: decodePassword
    }
  }

  // testJwt(): Observable<any>{
  //   return this.http.get<any>(this.API + "random", {
  //     headers: new HttpHeaders({
  //       'Authorization': this.getToken()
  //     })
  //
  //   })
  // }
}

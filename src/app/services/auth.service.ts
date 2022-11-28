import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Login} from "../core/login/login.model";
import {environment} from "../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {TokenStorageService} from "./token-storage.service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
type JwtToken = {
  id_token: string;
};

const AUTH_API = environment.baseApi;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private jwtHelper: JwtHelperService) { }
  roles = [];

  validate(token: string | null): Observable<any> {
    // @ts-ignore
    return this.http.post(AUTH_API + 'validate', {
      token
    }, httpOptions);
  }

  getAll(){
    return this.http.get("http://localhost:1507/vibee/api/v1/admins/product/getall?pagenumber=0&pagesize=10&valuefilter=none&typefilter=none&language=vi&search=");
  }

  public getRolesFromToken(token: string): string[] | string | any{
    const decodeToken = this.jwtHelper.decodeToken(token);
    this.roles = decodeToken.roles;
    return this.roles;
  }

  public isLoggedIn(): boolean{
    return this.tokenStorage.getToken() !== null;
  }

  public canAccess(url: string){
    console.log("canAccess ", url, this.roles);
    return true;
  }

  public checkToken(token: string): boolean{
    if (this.jwtHelper.isTokenExpired(token)) {
      // token expired
      return false;
    } else {
      // token valid
      return true;
    }
  }

  // validateToken(credentials: Login): Observable<any> {
  //   return this.http.post(AUTH_API + 'login', credentials, httpOptions);
  // }

  // getAll(){
  //   return this.http.get("http://localhost:8080/vibee/api/v1/admins/product/getall?pagenumber=0&pagesize=10&valuefilter=none&typefilter=none&language=vi&search=");
  // }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {TokenStorageService} from "./token-storage.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private jwtHelper: JwtHelperService) { }
  roles = [];

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

}

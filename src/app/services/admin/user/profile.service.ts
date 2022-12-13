import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {ProfileRequest} from '../../../shared/model/request/profileRequest';
import {ChangePasswordRequest} from '../../../shared/model/request/changePasswordRequest';
import {Observable} from 'rxjs';
import {environment} from "../../../../environments/environment";
import {TokenStorageService} from "../../token-storage.service";

const AUTH_API = environment.baseApi;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  readonly URL = AUTH_API + "auth";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ` + this.tokenService.getToken()!,
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }),
  };

  constructor(private httpClient: HttpClient, private tokenService: TokenStorageService) {
  }

  edit() {
    return this.httpClient.get(this.URL + "/profile", this.httpOptions)
  }

  update(request: ProfileRequest) {
    return this.httpClient.post(this.URL + "/profile/update", request, this.httpOptions)
  }

  changPassword(request: ChangePasswordRequest): Observable<any> {
    return this.httpClient.post<any>(this.URL + '/change', request, this.httpOptions);
  }

}

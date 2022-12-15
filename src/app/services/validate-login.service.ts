import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ValidateLoginService{
  constructor(private router: Router) {
  }

  checkToken(authorization: string | null){
    if(!authorization){
      this.router.navigate(['/login']);
    }
  }
}

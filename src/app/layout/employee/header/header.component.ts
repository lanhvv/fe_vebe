import {Component, Input, OnInit} from '@angular/core';
import {TranslateConfigService} from "../../../services/translate-config.service";
import {Router} from "@angular/router";

@Component({
  selector: 'employee-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderEmployeeComponent implements OnInit {

  @Input() Status: number | undefined;
  language!:string;
  constructor(private translateService:TranslateConfigService, private router: Router) { }

  ngOnInit(): void {
    this.language=this.translateService.getLanguage()!;
  }

  logout(){
    sessionStorage.removeItem('auth-user');
    sessionStorage.removeItem('Authorization');
    this.router.navigate(['/login']);
  }

}

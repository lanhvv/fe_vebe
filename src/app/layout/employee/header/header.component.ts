import {Component, Input, OnInit} from '@angular/core';
import {TranslateConfigService} from "../../../services/translate-config.service";

@Component({
  selector: 'employee-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderEmployeeComponent implements OnInit {

  @Input() Status: number | undefined;
  language!:string;
  constructor(private translateService:TranslateConfigService) { }

  ngOnInit(): void {
    this.language=this.translateService.getLanguage()!;
  }

}

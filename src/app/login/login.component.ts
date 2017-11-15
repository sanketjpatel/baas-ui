import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GlobalService} from '../shared/global-service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  accountId: string;
  constructor(private router: Router, private globalService: GlobalService) { }

  ngOnInit() {
  }

  onLogin() {
    this.globalService.accountId = this.accountId;
    return this.router.navigate(['/assets']);
  }

}

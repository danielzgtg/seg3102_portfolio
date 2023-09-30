import { Component } from '@angular/core';
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  constructor(protected login: LoginService) {
  }
}

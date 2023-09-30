import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private login: LoginService) {
  }

  canActivate(_route: unknown, _state: unknown): boolean {
    if (this.login.loggedIn()) {
      return true;
    }
    this.login.toLoginPage();
    return false;
  }
}

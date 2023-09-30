import {Injectable} from '@angular/core';
import {CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private auth: AuthenticationService) {
  }

  canActivate(_route: unknown, state: RouterStateSnapshot): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    }
    this.auth.toLoginPage(state.url);
    return false;
  }
}

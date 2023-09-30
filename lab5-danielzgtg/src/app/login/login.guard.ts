import {Injectable} from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from "./login.service";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private login: LoginService, private router: Router) {
  }

  canActivate(_route: unknown, state: RouterStateSnapshot): Observable<boolean> {
    return this.login.waitForInitialUser().pipe(
      tap(x => {
        if (!x) {
          // noinspection JSIgnoredPromiseFromCall
          this.router.navigate(["/login"]);
        }
      }),
    );
  }
}

import {Component, OnDestroy} from '@angular/core';
import {AuthenticationService} from "../auth/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  protected readonly loggedIn: boolean;
  protected error: boolean = false;

  constructor(private auth: AuthenticationService) {
    this.loggedIn = auth.isLoggedIn();
  }

  ngOnDestroy(): void {
    this.auth.clearRedirect();
  }

  logIn(correct: boolean) {
    if (!this.auth.logIn(correct)) {
      this.error = true;
    }
  }

  logOut(): void {
    this.auth.logOut();
  }
}

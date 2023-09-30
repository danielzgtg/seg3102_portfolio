import {Component, OnDestroy} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";
import {NotificationService} from "../notification/notification.service";

const DEBUG = false;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [NotificationService],
})
export class LoginComponent implements OnDestroy {
  protected sub: Subscription | undefined = void 0;
  protected error: boolean = false;
  protected email: string = !DEBUG ? "" : "test@example.com";
  protected pass: string = !DEBUG ? "" : "123456";
  protected loggedIn: boolean = false;
  private cleanup: Subscription;

  constructor(private login: LoginService, private notification: NotificationService, private router: Router) {
    this.cleanup = new Subscription;
    this.cleanup.add(login.$.subscribe(x => {
      if ((this.loggedIn = x)) {
        this.email = login.getEmail();
      }
    }));
    this.cleanup.add(notification.$.subscribe(x => this.error = x.error));
    (this.sub = new Subscription).add(login.waitForInitialUser().subscribe(() => {
      this.sub = void 0;
    }));
  }

  private doLogin($: Observable<string>): void {
    this.sub = $.subscribe(error => {
      if (error) {
        this.notification.show(error, true);
        this.pass = "";
        this.sub = void 0;
        return;
      }
      this.sub = void 0;
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate(["/friends"]);
    })
  }

  protected logIn(): void {
    this.doLogin(this.login.signIn(this.email, this.pass));
  }

  protected signUp(): void {
    this.doLogin(this.login.signUp(this.email, this.pass));
  }

  protected google(): void {
    this.doLogin(this.login.googleSignIn());
  }

  protected resetPassword(): void {
    this.sub = this.login.resetPassword(this.email).subscribe(x => {
      this.notification.show(x || "Check your email!", !!x);
      this.sub = void 0;
    });
  }

  protected logOut(): void {
    this.sub = this.login.signOut().subscribe(() => {
      this.loggedIn = false;
      this.notification.show("", false);
      this.sub = void 0;
      // Temporary fix to the service problem
      location.reload();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      // Refresh to restore consistency because signInWithPopup can't be closed
      location.reload();
    }
  }
}

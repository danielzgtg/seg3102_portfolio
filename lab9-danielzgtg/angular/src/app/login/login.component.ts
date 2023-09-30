import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";

const DEBUG = false;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  protected sub: Subscription | undefined = void 0;
  protected failed: boolean = false;
  protected username: string = !DEBUG ? "" : "user1";
  protected password: string = !DEBUG ? "" : "pass1";

  constructor(private service: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    this.service.enforceLogOut();
  }

  protected login(): void {
    this.sub = this.service.logIn(this.username, this.password).subscribe(x => {
      if (!x) {
        this.failed = true;
        this.password = "";
        this.sub = void 0;
        return;
      }
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate(["/calculator"]);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  // No sign up feature is required. See AuthenticationController.kt
}

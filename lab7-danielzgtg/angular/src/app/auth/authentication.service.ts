import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

const DEBUG = false;
const REDIRECT: string = "/home";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Greatly simplified the login to speed up testing
  private loggedIn: boolean = DEBUG;
  private redirect: string = REDIRECT;

  constructor(private router: Router) { }

  logIn(correct: boolean): boolean {
    // No real point with the form because everyone knows the password
    if (!correct) return false;
    this.loggedIn = true;
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate([this.redirect]);
    this.clearRedirect();
    return true;
  }

  logOut(): void {
    this.loggedIn = false;
    this.clearRedirect();
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate([this.redirect]);
  }

  isLoggedIn(): boolean {
    // sessionStorage is often disabled on my browser
    return this.loggedIn;
  }

  toLoginPage(redirect: string): void {
    this.redirect = redirect;
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(["/login"]);
  }

  clearRedirect(): void {
    this.redirect = REDIRECT;
  }
}

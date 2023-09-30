import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, map, Observable, of} from "rxjs";
import {BASE_URL} from "../constants";

const URL = BASE_URL + "auth/signin";

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  #token: string = "";

  constructor(private http: HttpClient, private router: Router) {
  }

  logIn(username: string, password: string): Observable<boolean> {
    return this.http.post(URL, {username, password}, {
      responseType: "text",
    }).pipe(
      map(x => {
        if (x.match(/\./g)?.length != 2) {
          return false;
        }
        this.#token = x;
        return true;
      }),
      catchError(x => of(false)),
    );
  }

  loggedIn(): boolean {
    // sessionStorage is often disabled on my browser
    return !!this.#token;
  }

  toLoginPage(): void {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(["/login"])
  }

  logOut(): void {
    this.enforceLogOut();
    this.toLoginPage();
  }

  enforceLogOut(): void {
    this.#token = "";
  }

  get token(): string {
    return this.#token;
  }

  // Not bothering to redirect to login once the token expires and we get 401.
  // Users will naturally refresh the page
}

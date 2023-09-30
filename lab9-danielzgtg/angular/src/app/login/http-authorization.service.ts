import {Injectable} from '@angular/core';
import {LoginService} from "./login.service";
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {BASE_URL} from "../constants";

@Injectable()
class HttpAuthorizationService implements HttpInterceptor {
  constructor(private login: LoginService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.login.token;
    if (!token || !req.url.startsWith(BASE_URL)) {
      return next.handle(req);
    }
    return next.handle(req.clone({
      headers: req.headers.set("authorization", "Bearer " + token),
    }));
  }
}

export const authInterceptor = {provide: HTTP_INTERCEPTORS, useClass: HttpAuthorizationService, multi: true};

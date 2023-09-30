import {Injectable} from '@angular/core';
import {UserDirectoryService} from "./user-directory.service";
import {CanActivate, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HasFriendsGuard implements CanActivate {
  constructor(private service: UserDirectoryService, private router: Router) {
  }

  canActivate(_route: unknown, _state: unknown): boolean {
    if (!this.service.isEmpty()) {
      return true;
    }
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(["/add"])
    return false;
  }
}

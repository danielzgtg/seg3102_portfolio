import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FriendsService} from "../friends.service";
import {Subscription} from "rxjs";
import {NewProfile} from "../models";
import {LoginService} from "../login/login.service";
import {NotificationService} from "../notification/notification.service";

const DEBUG = false;

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  providers: [NotificationService],
})
export class MyProfileComponent implements OnDestroy {
  protected loaded: boolean = false;
  protected initialValue: NewProfile | undefined = void 0;
  protected sub: Subscription | undefined = void 0;
  protected email: string = "";

  constructor(
    private service: FriendsService,
    private router: Router,
    private notification: NotificationService,
    login: LoginService,
  ) {
    this.sub = service.getMyProfile().subscribe({
      next: x => {
        // getProfile converts null to empty uid
        this.initialValue = !DEBUG || x.uid ? x : {
          first: "Daniel",
          last: "Tang",
          phone: "1234567890",
        };
        this.loaded = true;
        this.sub = void 0;
      },
      error: () => {
        this.notification.show("Please check your internet connection", true);
        this.loaded = true;
        this.sub = void 0;
      },
    });
    this.email = login.getEmail();
  }

  protected submit(profile: NewProfile): void {
    this.sub = this.service.saveMyProfile(profile).subscribe(x => {
      this.sub = void 0;
      this.notification.show(x ? "Saved!" : "Something went wrong", !x);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  delete(): void {
    this.sub = this.service.deleteMyProfile().subscribe(x => {
      this.sub = void 0;
      this.notification.show(x ? "We're sad to see you go" : "Something went wrong", !x);
    })
  }
}

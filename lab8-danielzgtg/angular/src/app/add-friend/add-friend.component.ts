import {Component, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {FriendsService} from "../friends.service";
import {Subscription} from "rxjs";
import {NewFriend} from "../models";

const DEBUG = false;

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
})
export class AddFriendComponent implements OnDestroy {
  protected readonly initialValue: NewFriend | undefined = !DEBUG ? void 0 : {
    firstName: "Daniel",
    lastName: "Tang",
    phone: "1234567890",
    email: "dtang090@uottawa.ca",
  } as NewFriend;
  protected sub: Subscription | undefined = void 0;

  constructor(private service: FriendsService, private router: Router) {
  }

  protected submit(friend: NewFriend): void {
    this.sub?.unsubscribe();
    this.sub = this.service.addFriend(friend).subscribe(x => {
      this.sub = void 0;
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate(['/friends']);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}

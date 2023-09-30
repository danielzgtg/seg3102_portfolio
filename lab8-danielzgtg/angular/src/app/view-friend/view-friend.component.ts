import {Component, OnDestroy} from '@angular/core';
import {Friend, NewFriend} from "../models";
import {catchError, map, of, startWith, Subscription, switchMap, tap} from "rxjs";
import {FriendsService} from "../friends.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-view-friend',
  templateUrl: './view-friend.component.html',
  styleUrls: ['./view-friend.component.scss']
})
export class ViewFriendComponent implements OnDestroy {
  protected initialValue: Friend | undefined = void 0;
  protected sub: Subscription;
  protected sub2: Subscription | undefined = void 0;

  constructor(private service: FriendsService, private route: ActivatedRoute, private router: Router) {
    this.sub = this.route.params.pipe(
      map(x => "" + x["id"]),
      switchMap(x => this.service.getFriend(x).pipe(
        startWith(undefined),
        catchError(_ => of(undefined)),
      )),
    ).subscribe(x => {
      this.initialValue = x;
    });
  }

  protected submit(friend: NewFriend): void {
    this.sub2?.unsubscribe();
    this.sub2 = this.service.updateFriend({...friend, friendId: this.initialValue!!.friendId}).subscribe(_ => {
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate(['/friends']);
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2?.unsubscribe();
  }

  protected delete(): void {
    this.sub2?.unsubscribe();
    this.sub2 = this.service.removeFriend(this.initialValue!!.friendId).subscribe(_ => {
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate(['/friends']);
    });
  }
}

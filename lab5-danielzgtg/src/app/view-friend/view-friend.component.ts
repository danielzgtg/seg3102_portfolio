import {Component, OnDestroy} from '@angular/core';
import {Profile} from "../models";
import {catchError, map, of, startWith, Subscription, switchMap} from "rxjs";
import {FriendsService} from "../friends.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-friend',
  templateUrl: './view-friend.component.html',
  styleUrls: ['./view-friend.component.scss']
})
export class ViewFriendComponent implements OnDestroy {
  protected initialValue: Profile | undefined = void 0;
  protected sub: Subscription;

  constructor(private service: FriendsService, private route: ActivatedRoute) {
    this.sub = this.route.params.pipe(
      map(x => "" + x["id"]),
      switchMap(x => this.service.getProfile(x).pipe(
        startWith(undefined),
        catchError(_ => of(undefined)),
      )),
    ).subscribe(x => {
      this.initialValue = x;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

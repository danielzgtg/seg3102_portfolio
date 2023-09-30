import {Component, OnDestroy, OnInit} from '@angular/core';
import type {Profile} from "../models";
import {FriendsService, RemainingStatus} from "../friends.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  protected loading: boolean = true;
  protected hasMore: boolean = false;

  protected track(_: number, item: Profile) {
    return item.uid;
  }

  constructor(protected service: FriendsService) {
    this.sub = service.remaining$.subscribe(x => {
      this.loading = false;
      this.hasMore = true;
      switch (x) {
        case RemainingStatus.LOADING:
          this.loading = true;
          break;
        case RemainingStatus.ENDED:
          this.hasMore = false;
          break;
        case RemainingStatus.HAS_MORE:
          break;
      }
    });
  }

  ngOnInit(): void {
    this.service.ensureRefreshedOnce();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import {Friend} from "../models";
import {FriendsService} from "../friends.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {
  private sub: Subscription | undefined = void 0;
  protected data: Friend[] | undefined = void 0;

  constructor(private service: FriendsService) {
  }

  protected track(_: number, item: Friend) {
    return item.friendId;
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.sub?.unsubscribe();
    this.data = void 0;
    this.sub = this.service.listFriends().subscribe(x => {
      this.data = x;
    });
  }
}

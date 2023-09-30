import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Profile, UserDirectoryService} from "../user-directory.service";

// I assumed the table should be able to show multiple submissions.
// This is based on reasonable expectations and the next lab's instructions

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendsListComponent {
  protected track(_: number, item: Profile) {
    return item.id;
  }

  constructor(protected service: UserDirectoryService) {
  }
}

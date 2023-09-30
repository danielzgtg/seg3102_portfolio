import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddFriendComponent} from "./add-friend/add-friend.component";
import {FriendsListComponent} from "./friends-list/friends-list.component";
import {ViewFriendComponent} from "./view-friend/view-friend.component";

// No guards. It was pointless last time and there is no authentication required this time.

const routes: Routes = [
  {path: 'add', component: AddFriendComponent},
  {path: 'friends/:id', component: ViewFriendComponent},
  {path: 'friends', component: FriendsListComponent},
  {path: '**', redirectTo: 'add', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

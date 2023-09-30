import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyProfileComponent} from "./my-profile/my-profile.component";
import {ViewFriendComponent} from "./view-friend/view-friend.component";
import {FriendsListComponent} from "./friends-list/friends-list.component";
import {LoginComponent} from "./login/login.component";
import {LoginGuard} from "./login/login.guard";

const canActivate = [LoginGuard];

const routes: Routes = [
  {path: 'profile', component: MyProfileComponent, canActivate},
  {path: 'friends', component: FriendsListComponent, canActivate},
  {path: 'friends/:id', component: ViewFriendComponent, canActivate},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: 'friends'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

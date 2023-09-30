import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MyFormComponent} from "./my-form/my-form.component";
import {FriendsListComponent} from "./friends-list/friends-list.component";
import {HasFriendsGuard} from "./has-friends.guard";
import {NotFoundComponent} from "./not-found.component";

const routes: Routes = [
  {path: 'add', component: MyFormComponent},
  {path: 'friends', component: FriendsListComponent, canActivate: [HasFriendsGuard]},
  {path: '', redirectTo: 'add', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AddFriendComponent} from './add-friend/add-friend.component';
import {FriendsListComponent} from './friends-list/friends-list.component';
import {GraphQLModule} from "./graphql.module";
import {HttpClientModule} from "@angular/common/http";
import {ApolloModule} from "apollo-angular";
import { ViewFriendComponent } from './view-friend/view-friend.component';
import { FriendEditorComponent } from './friend-editor/friend-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    AddFriendComponent,
    FriendsListComponent,
    ViewFriendComponent,
    FriendEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    GraphQLModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

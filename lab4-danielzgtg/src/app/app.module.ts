import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import { MyFormComponent } from './my-form/my-form.component';
import { FriendsListComponent } from './friends-list/friends-list.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import { NotFoundComponent } from './not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    MyFormComponent,
    FriendsListComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ScrollingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

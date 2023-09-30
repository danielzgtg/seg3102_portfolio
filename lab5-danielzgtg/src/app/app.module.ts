import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {connectFirestoreEmulator, getFirestore, provideFirestore} from "@angular/fire/firestore/lite";
import {connectAuthEmulator, getAuth, provideAuth} from "@angular/fire/auth";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {FriendsListComponent} from './friends-list/friends-list.component';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {FriendEditorComponent} from './friend-editor/friend-editor.component';
import {ViewFriendComponent} from './view-friend/view-friend.component';
import {LoginComponent} from './login/login.component';
import {NavComponent} from './nav/nav.component';
import {NotificationComponent} from './notification/notification.component';

const DEBUG = false;

@NgModule({
  declarations: [
    AppComponent,
    FriendsListComponent,
    MyProfileComponent,
    FriendEditorComponent,
    ViewFriendComponent,
    LoginComponent,
    NavComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ScrollingModule,
    provideFirebaseApp(() => initializeApp({
      projectId: 'seg3102-b2b42',
      appId: '1:960670801400:web:804b94fa1fc16c2d3e4a0d',
      apiKey: 'AIzaSyCek1SWOM14uWRFqwMnHgjwPKJ0AjIgx4M',
      authDomain: 'seg3102-b2b42.firebaseapp.com',
    })),
    provideAuth(() => {
      const auth = getAuth();
      if (DEBUG) {
        connectAuthEmulator(auth, 'http://localhost:9099');
      }
      return auth;
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      if (DEBUG) {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
      }
      return firestore;
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}

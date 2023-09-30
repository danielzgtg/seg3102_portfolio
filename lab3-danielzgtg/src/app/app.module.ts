import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AdapterComponent } from './shopping-list/adapter/adapter.component';
import { ShoppingFormComponent } from './shopping-form/shopping-form.component';
import {FormsModule} from "@angular/forms";
import {ScrollingModule} from "@angular/cdk/scrolling";

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    AdapterComponent,
    ShoppingFormComponent,
  ],
    imports: [
        BrowserModule,
        FormsModule,
        ScrollingModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

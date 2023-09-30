import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { BooksComponent } from './books/books.component';
import { NavComponent } from './nav/nav.component';
import { BookComponent } from './books/book/book.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthornamesPipe } from './pipes/authornames.pipe';
import {ReactiveFormsModule} from "@angular/forms";
import {PricePipe} from "./pipes/price.pipe";
import { AuthorsComponent } from './authors/authors.component';
import { AuthorComponent } from './authors/author/author.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    BooksComponent,
    NavComponent,
    BookComponent,
    LoginComponent,
    AdminComponent,
    AuthornamesPipe,
    AuthorsComponent,
    AuthorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    PricePipe,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

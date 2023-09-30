import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {AdminComponent} from "./admin/admin.component";
import {AuthorComponent} from "./authors/author/author.component";
import {AuthorsComponent} from "./authors/authors.component";
import {BookComponent} from "./books/book/book.component";
import {BooksComponent} from "./books/books.component";
import {ContactComponent} from "./contact/contact.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {LoggedInGuard} from "./auth/logged-in.guard";

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "about", component: AboutComponent},
  {path: "contact", component: ContactComponent},
  {path: "books", component: BooksComponent, children: [{path: ":id", component: BookComponent}]},
  {path: "authors", component: AuthorsComponent, children: [{path: ":id", component: AuthorComponent}]},
  {path: "login", component: LoginComponent},
  {path: "admin", component: AdminComponent, canActivate: [LoggedInGuard]},
  {path: "**", redirectTo: "home"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

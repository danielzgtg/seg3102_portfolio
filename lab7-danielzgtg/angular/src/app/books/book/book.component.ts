import {Component, OnDestroy, OnInit} from '@angular/core';
import type {Book} from "../../models";
import {catchError, delay, identity, map, of, startWith, Subscription, switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {BooksService} from "../../books.service";
import {AuthenticationService} from "../../auth/authentication.service";

const DEBUG = false;

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit, OnDestroy {
  protected readonly loggedIn: boolean;
  protected book: Readonly<Book> | undefined | null = void 0;
  private readonly sub: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private books: BooksService, auth: AuthenticationService) {
    this.loggedIn = auth.isLoggedIn();
  }

  ngOnInit(): void {
    this.sub.add(this.route.params.pipe(
      map(x => "" + x["id"]),
      // switchMap avoids memory leaks
      switchMap(x => this.books.getBook(x).pipe(
        !DEBUG ? identity : delay(1000),
        startWith(undefined),
        catchError(_ => of(null)),
      )),
    ).subscribe(x => {
      this.book = x;
    }));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  protected remove(): void {
    // detach
    this.books.removeBook(this.book!.id).subscribe();
    this.book = null;
  }
}

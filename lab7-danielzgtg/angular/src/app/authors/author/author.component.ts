import {Component, OnDestroy} from '@angular/core';
import {Author} from "../../models";
import {catchError, delay, identity, map, of, startWith, Subscription, switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {BooksService} from "../../books.service";

const DEBUG = false;

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html'
})
export class AuthorComponent implements OnDestroy {
  protected author: Readonly<Author> | undefined | null = void 0;
  private readonly sub: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private books: BooksService) {
  }

  ngOnInit(): void {
    this.sub.add(this.route.params.pipe(
      map(x => "" + x["id"]),
      // switchMap avoids memory leaks
      switchMap(x => this.books.getAuthor(x).pipe(
        !DEBUG ? identity : delay(1000),
        startWith(undefined),
        catchError(_ => of(null)),
      )),
    ).subscribe(x => this.author = x));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

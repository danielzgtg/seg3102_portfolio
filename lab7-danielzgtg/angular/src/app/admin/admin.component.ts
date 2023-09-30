import {Component, OnDestroy} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BooksService} from "../books.service";
import type {Author, AuthorName, Book} from "../models";
import {first, forkJoin, mergeMap, Subject, Subscription} from "rxjs";

const DEBUG = false;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnDestroy {
  protected busy: boolean = false;
  protected success: string | null = "";
  protected authors: FormArray;
  protected book: FormGroup;
  private sub: Subscription = new Subscription();

  constructor(private books: BooksService, private fb: FormBuilder) {
    this.book = fb.nonNullable.group({
      // Not doing more validation than done on server
      // That would deceive oneself.
      isbn: [''],
      category: [''],
      title: ['', Validators.required],
      cost: ['', [Validators.required, Validators.pattern(/^\d+(\.\d\d?)?$/)]],
      year: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      description: [''],
      authors: this.authors = fb.array([]),
    });
    if (DEBUG) {
      this.book.setValue({
        isbn: "978-3-16-148410-0",
        // Category shall not be limited, neither on client nor server.
        category: "Wikipedia",
        title: "File:EAN-13-ISBN-13.svg",
        cost: 1234,
        year: 2022,
        description: "Hello World",
        authors: [],
      });
    }
  }

  protected addAuthor(): void {
    this.authors.push(this.fb.group({
      firstName: [''],
      lastName: [''],
    }));
  }

  protected removeAuthor(i: number): void {
    this.authors.removeAt(i);
  }

  protected submit(): void {
    if (this.busy) return;
    this.success = "";
    const form: any = this.book.value;
    const book: Partial<Book> = {
      isbn: "" + form.isbn,
      category: "" + form.category,
      title: "" + form.title,
      cost: +form.cost,
      year: +form.year,
      description: "" + form.description,
    };
    const authors: AuthorName[] = (form.authors as Partial<AuthorName>[]).map(x => ({
      firstName: "" + x.firstName,
      lastName: "" + x.lastName,
    }));
    this.book.setValue({...book, authors});
    if (!this.book.valid) return;
    this.busy = true;
    const finish: Subject<unknown> = new Subject();
    // locked by busy
    this.sub = finish.subscribe(_ => {
      this.busy = false;
    });
    const error: () => void = () => {
      this.success = null;
      finish.next(null);
    };
    // detach
    this.books.addBook(book).pipe(first()).subscribe({
      // IDK why this part is done on the client, not the server.
      // Probably just as an exercise. The downside is that this isn't done as a single transaction.
      next: book => {
        const success: () => void = () => {
          this.success = "" + book.id;
          this.authors.clear();
          this.book.reset();
          finish.next(null);
        };
        if (!authors.length) {
          success();
          return;
        }
        // detach
        forkJoin(authors.map(author => this.books.getAuthorsNamed(author).pipe(
          first(),
          mergeMap((existing: Author[]) => {
            if (!existing?.length) {
              return this.books.addBookAuthor(book.id, author);
            }
            // Assumes unique firstName/lastName for authors
            return this.books.updateBookAuthors(book.id, existing[0].id);
          }))
        )).subscribe({next: success, error});
      },
      error,
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

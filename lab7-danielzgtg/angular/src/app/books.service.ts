import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import type {Author, AuthorName, Book} from "./models";

const URL = "http://localhost:8080/books-api/";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) {
  }

  getBook(id: string): Observable<Book> {
    if (!id) throw Error();
    return this.http.get<Book>(`${URL}books/${id}`);
  }

  getAuthor(id: string): Observable<Author> {
    if (!id) throw Error();
    return this.http.get<Author>(`${URL}authors/${id}`)
  }

  addBook(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(`${URL}books`, book);
  }

  addBookAuthor(id: number, author: AuthorName): Observable<unknown> {
    return this.http.post<unknown>(`${URL}books/${id}/authors`, author)
  }

  getAuthorsNamed(authorName: AuthorName): Observable<Author[]> {
    const params = new HttpParams()
      .set("firstName", authorName.firstName ?? "")
      .set("lastName", authorName.lastName ?? "");
    return this.http.get<any>(`${URL}authors`, {params}).pipe(
      map(x => x?._embedded?.authors ?? []),
    );
  }

  updateBookAuthors(bookId: number, authorId: number): Observable<unknown> {
    return this.http.patch<unknown>(`${URL}books/${bookId}/authors/${authorId}`, null);
  }

  removeBook(id: number): Observable<unknown> {
    return this.http.delete(`${URL}books/${id}`);
  }
}

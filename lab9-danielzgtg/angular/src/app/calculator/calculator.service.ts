import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../constants";

const URL = BASE_URL + "calculator/";

@Injectable()
export class CalculatorService {

  constructor(private http: HttpClient) {
  }

  private get(url: string): Observable<string> {
    return this.http.get(url, {
      responseType: "text",
    });
  }

  add(x: number, y: number): Observable<string> {
    return this.get(`${URL}add/${x}/${y}`);
  }

  sub(x: number, y: number): Observable<string> {
    return this.get(`${URL}subtract/${x}/${y}`);
  }

  mul(x: number, y: number): Observable<string> {
    return this.get(`${URL}multiply/${x}/${y}`);
  }

  div(x: number, y: number): Observable<string> {
    return this.get(`${URL}divide/${x}/${y}`);
  }
}

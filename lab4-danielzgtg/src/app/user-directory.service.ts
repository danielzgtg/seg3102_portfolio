import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

/**
 * A shopping list item
 */
export interface Profile {
  /**
   * The id
   */
  id: number;
  /**
   * The first name
   */
  first: string;
  /**
   * The last name
   */
  last: string;
  /**
   * The phone number
   */
  phone: string;
  /**
   * The email address
   */
  email: string;
}

const DEBUG = false;

@Injectable({
  providedIn: 'root'
})
export class UserDirectoryService {
  #$: BehaviorSubject<readonly Profile[]> = new BehaviorSubject<readonly Profile[]>([]);
  private autoIncrement: number = 0;

  constructor() {
    if (DEBUG) {
      for (let i = 0; i < 20000; i++) {
        this.add({first: i.toString()});
      }
    }
  }

  isEmpty(): boolean {
    return !this.#$.value.length;
  }

  get $(): Observable<readonly Profile[]> {
    return this.#$;
  }

  del(id: number) {
    this.#$.next(this.#$.value.filter(x => x.id != id));
  }

  add(item: Partial<Profile>): void {
    const { phone } = item;
    if (phone && (phone.length != 10 || !/^[1-9]\d\d[1-9]\d{6}$/.test(phone))) {
      throw new Error();
    }
    this.#$.next([...this.#$.value, {
      id: ++this.autoIncrement,
      first: item.first || "John",
      last: item.last || "Doe",
      phone: phone || "1234567890",
      email: "test@example.com",
    }]);
  }
}

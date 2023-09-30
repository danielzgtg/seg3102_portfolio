import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

/**
 * A shopping list item
 */
export interface CartItem {
  /**
   * The unique id
   */
  id: number;
  /**
   * The description of this item
   */
  text: string;
}

const DEBUG = false;

@Injectable()
export class ShoppingCartService {
  #$: BehaviorSubject<readonly CartItem[]> = new BehaviorSubject<readonly CartItem[]>([]);
  private autoIncrement: number = 0;

  constructor() {
    this.add("5 apples");
    this.add("12 eggs");
    this.add("1 bread"); // [sic]
    if (DEBUG) {
      for (let i = 0; i < 20000; i++) {
        this.add(i.toString());
      }
    }
  }

  get $(): Observable<readonly CartItem[]> {
    return this.#$;
  }

  del(id: number) {
    this.#$.next(this.#$.value.filter(x => x.id != id));
  }

  add(text: string): void {
    this.#$.next([...this.#$.value, {
      id: ++this.autoIncrement,
      text: text,
    }]);
  }
}

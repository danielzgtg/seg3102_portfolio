import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription, timer} from "rxjs";

interface Notification {
  error: boolean;
  message: string;
}

const EMPTY: Readonly<Notification> = {
  error: false,
  message: "",
};

@Injectable()
export class NotificationService implements OnDestroy {
  #$: BehaviorSubject<Readonly<Notification>> = new BehaviorSubject<Readonly<Notification>>(EMPTY);
  private sub: Subscription = new Subscription;

  get $(): Observable<Readonly<Notification>> {
    return this.#$;
  }

  show(message: string, error: boolean) {
    this.#$.next({error, message});
    this.sub.unsubscribe();
    this.sub = timer(3000).subscribe(() => {
      this.#$.next(EMPTY);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

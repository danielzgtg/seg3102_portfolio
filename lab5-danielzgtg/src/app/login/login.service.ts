import {Injectable, OnDestroy} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider, sendPasswordResetEmail,
  signInWithEmailAndPassword, signInWithPopup,
  signOut,
  UserCredential
} from "@angular/fire/auth";
import {BehaviorSubject, catchError, first, from, map, Observable, of, skip, take, tap} from "rxjs";

type ErrorMessages = { [key: string]: string };

const SIGN_IN_ERRORS: ErrorMessages = {
  // Not bothering to implement the migration because the starter code didn't bother either
  "auth/account-exists-with-different-credential": "Please try using email and password instead for this account",
  "auth/user-not-found": "You're ready to sign up with that email",
  "auth/weak-password": "Please enter a strong password",
  "auth/email-already-in-use": "That account already exists",
  "auth/wrong-password": "Please try entering your password again",
}

const PASSWORD_RESET_ERRORS: ErrorMessages = {
  "auth/user-not-found": "Please check the spelling of the email",
}

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnDestroy {
  readonly #$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private readonly sub: () => void;
  private initialRefresh: boolean = false;

  constructor(private auth: Auth) {
    this.sub = auth.onAuthStateChanged((user) => {
      this.initialRefresh = true;
      if (user) {
        if (!user.email) {
          // All the configured methods require email
          throw new Error;
        }
        this.#$.next(true);
      } else {
        this.#$.next(false);
      }
    });
  }

  get $(): Observable<boolean> {
    return this.#$;
  }

  waitForInitialUser(): Observable<boolean> {
    if (this.initialRefresh) {
      return of(this.#$.value);
    }
    return this.$.pipe(
      skip(1),
      first(),
    );
  }

  ngOnDestroy(): void {
    this.sub();
  }

  getEmail(): string {
    const result = this.auth.currentUser?.email;
    return result || "";
  }

  getUid(): string {
    const result = this.auth.currentUser?.uid;
    return result || "";
  }

  private wrap($: Promise<unknown>, errors: ErrorMessages): Observable<string> {
    return from($).pipe(
      map(() => ""),
      catchError(error => {
        const message: string | undefined = errors[error.code];
        if (!message) {
          console.error("Unknown auth error", error.code);
          return of("Something went wrong. Please try again.");
        }
        return of(message);
      }),
    );
  }

  signIn(email: string, password: string): Observable<string> {
    return this.wrap(signInWithEmailAndPassword(this.auth, email, password), SIGN_IN_ERRORS);
  }

  signUp(email: string, password: string): Observable<string> {
    return this.wrap(createUserWithEmailAndPassword(this.auth, email, password), SIGN_IN_ERRORS);
  }

  googleSignIn(): Observable<string> {
    return this.wrap(signInWithPopup(this.auth, new GoogleAuthProvider), SIGN_IN_ERRORS);
  }

  resetPassword(email: string): Observable<string> {
    return this.wrap(sendPasswordResetEmail(this.auth, email), PASSWORD_RESET_ERRORS);
  }

  signOut(): Observable<unknown> {
    return this.wrap(signOut(this.auth), {});
  }
}

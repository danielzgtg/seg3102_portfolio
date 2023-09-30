import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, from, map, Observable, of, Subscription, tap} from "rxjs";
import type {NewProfile, Profile} from "./models";
import {toNewProfile, toProfile} from "./models";
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs, limit,
  query,
  setDoc,
  startAfter
} from "@angular/fire/firestore/lite";
import {CollectionReference, DocumentReference, DocumentSnapshot, QuerySnapshot} from "firebase/firestore/lite";
import {LoginService} from "./login/login.service";

// It is intentional that live update was not added
// That is because it introduces a lot of complexity, most posting apps don't have it, and users would
// be surprised if the list keeps shifting


function validateProfile(profile: NewProfile) {
  const {first, last, phone} = profile;
  if (!first || first.length > 256 || !last || last.length > 256 || (phone && phone.length != 10)) {
    // Not bothering with the rest of the validation at this layer because it's not on the server
    throw new Error;
  }
}

const PAGE_SIZE: number = 5;

export const enum RemainingStatus {
  LOADING = -1,
  ENDED = 0,
  HAS_MORE = 1,
}

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  readonly #$: BehaviorSubject<readonly Profile[]> = new BehaviorSubject<readonly Profile[]>([]);
  private readonly col: CollectionReference;
  private sub: Subscription | undefined = void 0;
  private initiallyRefreshed: boolean = false;
  private cursor: DocumentSnapshot<unknown> | undefined = void 0;
  readonly #remaining$: BehaviorSubject<RemainingStatus> = new BehaviorSubject<RemainingStatus>(RemainingStatus.ENDED);
  private readonly myProfileRef: DocumentReference;
  private readonly uid: string;
  private readonly email: string;

  constructor(firestore: Firestore, login: LoginService) {
    const col: CollectionReference = collection(firestore, 'profiles');
    this.col = col;
    const uid: string = login.getUid();
    const email: string = login.getEmail();
    if (!uid || !email) {
      throw new Error;
    }
    this.myProfileRef = doc(col, uid);
    this.uid = uid;
    this.email = email;
  }

  // ### view-friend ###

  getProfile(uid: string): Observable<Profile> {
    // There is no error message translation because all errors in this service
    // can only be from system errors not user errors
    return from(getDoc(doc(this.col, uid))).pipe(
      map(x => toProfile(uid, x.data())),
    );
  }

  // ### my-profile ###

  getMyProfile(): Observable<Profile> {
    return this.getProfile(this.uid);
  }

  private wrapMutation($: Promise<unknown>): Observable<boolean> {
    return from($).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  saveMyProfile(profile: NewProfile): Observable<boolean> {
    const mutation: any = {...toNewProfile(profile), email: this.email};
    validateProfile(mutation);
    return this.wrapMutation(setDoc(this.myProfileRef, mutation));
  }

  deleteMyProfile(): Observable<boolean> {
    return this.wrapMutation(deleteDoc(this.myProfileRef));
  }

  // ### friends-list ###

  ensureRefreshedOnce(): void {
    if (this.initiallyRefreshed) {
      return;
    }
    this.refresh();
  }

  refresh(): void {
    this.initiallyRefreshed = true;
    const sub = this.sub;
    if (sub) {
      sub.unsubscribe();
      this.sub = void 0;
    }
    this.#$.next([]);
    this.cursor = void 0;
    this.loadMore();
  }

  loadMore(): void {
    if (this.sub) {
      return;
    }
    const { col, cursor } = this;
    const q = !cursor ? query(col) : query(col, startAfter(cursor), limit(PAGE_SIZE));
    this.#remaining$.next(RemainingStatus.LOADING);
    this.sub = from(getDocs(q)).subscribe({
      next: (x: QuerySnapshot) => {
        const { docs } = x;
        const result = [...this.#$.value, ...docs.map(doc => {
          this.cursor = doc;
          return toProfile(doc.id, doc.data());
        })];
        this.#$.next(result);
        this.#remaining$.next(docs.length === PAGE_SIZE ? RemainingStatus.HAS_MORE : RemainingStatus.ENDED);
        this.sub = void 0;
      },
      error: () => {
        this.sub = void 0;
        // Just ignore the error. The page will just show loading. If the user doesn't care they will navigate away,
        // and not be surprised or scared. If they are expecting something specific most of them will hit refresh soon.
      },
    })
  }

  get $(): Observable<readonly Profile[]> {
    return this.#$;
  }

  get remaining$(): Observable<RemainingStatus> {
    return this.#remaining$;
  }
}

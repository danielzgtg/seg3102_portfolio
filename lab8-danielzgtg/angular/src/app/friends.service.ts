import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import type {Friend, NewFriend} from "./models";
import {toFriend} from "./models";
import {Apollo, gql} from "apollo-angular";

const LIST_GQL = gql`query {
  friends {
    friendId
    firstName
    lastName
    phone
    email
  }
}`;

const CREATE_GQL = gql`mutation(
  $firstName: String!
  $lastName: String!
  $phone: String!
  $email: String!
) {
  newFriend(
    firstName: $firstName
    lastName: $lastName
    phone: $phone
    email: $email
  ) {
    friendId
  }
}`;

const GET_GQL = gql`query($friendId: ID!) {
  friendsById(friendId: $friendId) {
    friendId
    firstName
    lastName
    phone
    email
  }
}`;

const UPDATE_GQL = gql`mutation(
  $friendId: ID!
  $firstName: String
  $lastName: String
  $phone: String
  $email: String
) {
  updateFriend(
    friendId: $friendId
    firstName: $firstName
    lastName: $lastName
    phone: $phone
    email: $email
  ) {
    friendId
  }
}`;

const DELETE_GQL = gql`mutation($friendId: ID!) {
  deleteFriend(friendId: $friendId)
}`;


@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private apollo: Apollo) {
  }

  // These Observables should realistically emit at most once because no fancy options were set

  listFriends(): Observable<Friend[]> {
    return this.apollo.query<any>({
        query: LIST_GQL,
        fetchPolicy: "network-only", // Fix broken refresh
      }
    ).pipe(
      map(x => x.data.friends.map(toFriend)),
    );
  }

  getFriend(friendId: string): Observable<Friend> {
    if (!friendId) throw Error();
    return this.apollo.query<any>({
        query: GET_GQL,
        variables: { friendId },
      }
    ).pipe(
      map(x => toFriend(x.data.friendsById)),
    );
  }

  addFriend(friend: NewFriend): Observable<string> {
    return this.apollo.mutate<any>({
        mutation: CREATE_GQL,
        variables: friend,
      }
    ).pipe(
      map(x => "" + x.data.newFriend.friendId),
    );
  }

  updateFriend(friend: Friend): Observable<string> {
    return this.apollo.mutate<any>({
        mutation: UPDATE_GQL,
        variables: friend,
      }
    ).pipe(
      map(x => "" + x.data.updateFriend.friendId),
    );
  }

  removeFriend(friendId: string): Observable<boolean> {
    if (!friendId) throw Error();
    return this.apollo.mutate<any>({
        mutation: DELETE_GQL,
        variables: { friendId },
      }
    ).pipe(
      map(x => x.data.deleteFriend),
    );
  }
}

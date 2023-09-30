import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS, ApolloModule} from "apollo-angular";
import {HttpLink} from "apollo-angular/http";
import {ApolloClientOptions, InMemoryCache} from "@apollo/client/core";

const GRAPHQL_URL = 'http://localhost:9000/graphql';

@NgModule({
  imports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => ({
        link: httpLink.create({uri: GRAPHQL_URL}),
        cache: new InMemoryCache(),
      } as ApolloClientOptions<unknown>),
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {
}

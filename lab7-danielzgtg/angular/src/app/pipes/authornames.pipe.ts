import { Pipe, PipeTransform } from '@angular/core';
import {AuthorName} from "../models";

@Pipe({
  name: 'authornames'
})
export class AuthornamesPipe implements PipeTransform {
  transform(value: AuthorName[] | undefined): string {
    // Fixed XSS and wrong name order
    return value?.map(x => `${x.lastName}, ${x.firstName}`).join(" & ") ?? "";
  }
}

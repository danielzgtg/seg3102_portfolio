import {Component, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, Subject, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit, OnDestroy {
  protected readonly initial: string;
  private current: string;
  private readonly $instant: Subject<string> = new Subject();
  private readonly $: Subject<string> = new Subject();
  private readonly sub: Subscription = new Subscription();

  constructor(private router: Router, private route: ActivatedRoute) {
    this.initial = this.current = "" + (route.snapshot.firstChild?.params["id"] ?? "");
  }

  protected instantSearch(query: string): void {
    this.current = query;
    this.$instant.next(query);
  }

  protected submitSearch(): void {
    this.$.next(this.current)
  }

  ngOnInit(): void {
    // Autosubmit after 300. Normal submit after enter key or blur
    this.sub.add(this.$instant.pipe(debounceTime(300)).subscribe(this.$))
    this.$.pipe(distinctUntilChanged()).subscribe(
      x => this.router.navigate(!x ? ["./"] : ["./", x], {relativeTo: this.route}),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

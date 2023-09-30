import type {ElementRef, OnDestroy} from '@angular/core'
import {Component, ViewChild} from '@angular/core';
import {CalculatorService} from "./calculator.service";
import {Observable, Subscription} from "rxjs";

const DEBUG = false;

@Component({
  selector: 'app-calculator',
  providers: [CalculatorService],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnDestroy {
  protected n1: string = !DEBUG ? "" : "1";
  protected n1error: boolean = false;
  protected n2: string = !DEBUG ? "" : "2";
  protected n2error: boolean = false;
  protected ans: string = "";
  protected sub: Subscription | undefined = void 0;
  @ViewChild("i1")
  protected elem1!: ElementRef<HTMLInputElement>;
  @ViewChild("i2")
  protected elem2!: ElementRef<HTMLInputElement>;

  constructor(private service: CalculatorService) {
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private math(op: (x: number, y: number) => Observable<string>): void {
    const n1: number = Number.parseFloat(this.n1);
    const n2: number = Number.parseFloat(this.n2);
    ok: {
      const n2error: boolean = this.n2error = Number.isNaN(n2);
      if ((this.n1error = Number.isNaN(n1))) {
        this.elem1.nativeElement.focus();
      } else if (n2error) {
        this.elem2.nativeElement.focus();
      } else {
        break ok;
      }
      this.ans = "Error";
      return;
    }
    (this.sub = new Subscription).add(op(n1, n2).subscribe({
      next: (x: string) => {
        this.sub = void 0;
        this.ans = x;
      },
      error: () => {
        this.sub = void 0;
        this.ans = "Server Error";
        this.n1error = true;
        this.n2error = true;
        this.elem1.nativeElement.focus();
      },
    }));
  }

  add(): void {
    this.math(this.service.add.bind(this.service));
  }

  minus(): void {
    this.math(this.service.sub.bind(this.service));
  }

  mul(): void {
    this.math(this.service.mul.bind(this.service));
  }

  div(): void {
    this.math(this.service.div.bind(this.service));
  }
}

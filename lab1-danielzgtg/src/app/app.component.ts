import { Component, ViewChild } from '@angular/core';
import type { ElementRef } from '@angular/core'

function formatMath(x: number): string {
  return x > Number.MAX_SAFE_INTEGER || x < Number.MIN_SAFE_INTEGER ? x.toString() :
    x.toFixed(10).replace(/\.0+$|(\.\d*[123456789])0+$/, "$1");
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  n1: string = "";
  n1error: boolean = false;
  n2: string = "";
  n2error: boolean = false;
  ans: string = "";
  @ViewChild("i1")
  elem1!: ElementRef<HTMLInputElement>;
  @ViewChild("i2")
  elem2!: ElementRef<HTMLInputElement>;

  private math(op: (x: number, y: number) => string): void {
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
    this.ans = op(n1, n2);
  }

  add(): void {
    this.math((x, y) => formatMath(x + y));
  }

  sub(): void {
    this.math((x, y) => formatMath(x - y));
  }

  mul(): void {
    this.math((x, y) => formatMath(x * y));
  }

  div(): void {
    this.math((x, y) => !y ? "\u267E" : formatMath(x / y));
  }
}

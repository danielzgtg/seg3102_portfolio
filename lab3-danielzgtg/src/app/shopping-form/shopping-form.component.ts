import {Component, ElementRef, ViewChild} from '@angular/core';
import {ShoppingCartService} from "../shopping-cart.service";

@Component({
  selector: 'app-shopping-form',
  templateUrl: './shopping-form.component.html',
  styleUrls: ['./shopping-form.component.scss']
})
export class ShoppingFormComponent {
  protected text: string = "brocolli"; // [sic]
  protected error: boolean = false;
  @ViewChild("field") private field!: ElementRef<HTMLInputElement>;

  constructor(private cart: ShoppingCartService) {
  }

  protected add(): void {
    const text = this.text;
    if ((this.error = !text)) {
      this.field.nativeElement.focus();
      return;
    }
    this.error = false;
    this.text = "";
    this.cart.add(text);
  }
}

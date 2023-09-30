import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CartItem, ShoppingCartService} from "../shopping-cart.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingListComponent {
  protected track(_: number, item: CartItem) {
    return item.id;
  }

  constructor(protected cart: ShoppingCartService) {}
}

import { Component } from '@angular/core';
import {ShoppingCartService} from "./shopping-cart.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ShoppingCartService],
})
export class AppComponent {
}

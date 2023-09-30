import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CalculatorComponent} from './calculator/calculator.component';
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './login/login.component';
import {authInterceptor} from "./login/http-authorization.service";

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    authInterceptor,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

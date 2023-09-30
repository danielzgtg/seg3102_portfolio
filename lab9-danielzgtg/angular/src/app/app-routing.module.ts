import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CalculatorComponent} from "./calculator/calculator.component";
import {LoginComponent} from "./login/login.component";
import {LoginGuard} from "./login/login.guard";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'calculator', component: CalculatorComponent, canActivate: [LoginGuard]},
  {path: '**', redirectTo: 'calculator'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

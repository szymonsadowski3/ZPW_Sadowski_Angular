import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ListaWycieczekComponent} from "./components/lista-wycieczek/lista-wycieczek.component";
import {KoszykComponent} from "./components/koszyk/koszyk.component";
import {WycieczkaDetalComponent} from "./components/wycieczka-detal/wycieczka-detal.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {LoggedInAuthGuard} from './guards/loggedin.auth.guard';
import {NewWycieczkaComponent} from './components/new-wycieczka/new-wycieczka.component';
import {AfterOrderComponent} from './components/after-order/after-order.component';
import {ViewMyOrdersComponent} from "./components/view-my-orders/view-my-orders.component";
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";
import {EditWycieczkaComponent} from "./components/edit-wycieczka/edit-wycieczka.component";
import {AdminAuthGuard} from './guards/admin.auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/wycieczki', pathMatch: 'full'},
  {path: 'wycieczki', component: ListaWycieczekComponent, canActivate: [LoggedInAuthGuard]},
  {path: 'koszyk', component: KoszykComponent, canActivate: [LoggedInAuthGuard]},
  {path: 'wycieczka/:id', component: WycieczkaDetalComponent, canActivate: [LoggedInAuthGuard]},
  {path: 'login', component: SignInComponent},
  {path: 'add-trip', component: NewWycieczkaComponent, canActivate: [AdminAuthGuard]},
  {path: 'after-order/:id', component: AfterOrderComponent, canActivate: [LoggedInAuthGuard]},
  {path: 'view-my-orders', component: ViewMyOrdersComponent, canActivate: [LoggedInAuthGuard]},
  {path: 'admin-panel', component: AdminPanelComponent, canActivate: [AdminAuthGuard]},
  {path: 'edit-trip/:id', component: EditWycieczkaComponent, canActivate: [AdminAuthGuard]},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

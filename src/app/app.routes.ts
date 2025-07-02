import { Routes } from '@angular/router';
import { FichajeComponent } from '../pages/fichaje/fichaje.component';
import { LoginComponent } from '../core/components/login/login.component';

export const routes: Routes = [
  {
    path: "login",//raiz de la app
    pathMatch: 'full',//coincida nombre exacto
    component: LoginComponent
  },
  {
    path: "fichaje",//raiz de la app
    pathMatch: 'full',//coincida nombre exacto
    component: FichajeComponent
  },
  {
    path: "",//raiz de la app
    pathMatch: 'full',//coincida nombre exacto
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

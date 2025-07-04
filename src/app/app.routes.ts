import { Routes } from '@angular/router';
import { FichajeComponent } from '../pages/fichaje/fichaje.component';
import { LoginComponent } from '../core/components/login/login.component';
import { MenuComponent } from '../pages/menu/menu.component';
import { FichajePersonalComponent } from '../pages/menu/components/fichaje-personal/fichaje-personal.component';

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
    path: "menu",//raiz de la app
    pathMatch: 'full',//coincida nombre exacto
    component: MenuComponent
  },
   {
    path: "fichaje-personal",//raiz de la app
    pathMatch: 'full',//coincida nombre exacto
    component: FichajePersonalComponent
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

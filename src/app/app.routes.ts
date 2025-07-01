import { Routes } from '@angular/router';
import { FacturasComponent } from '../pages/facturas/facturas.component';
import { ChatboxComponent } from '../pages/chatbox/chatbox.component';
import { ChatComponent } from '../shared/components/chat/chat.component';
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
    path: 'chatbox',
    pathMatch: 'full',//coincida nombre exacto,
    component: ChatboxComponent
  },
  { path: 'chat/:tipo', component: ChatComponent },
  {
    path: '**',
    redirectTo: ''
  }
];

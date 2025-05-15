import { Routes } from '@angular/router';
import { FacturasComponent } from '../pages/facturas/facturas.component';
import { ChatboxComponent } from '../pages/chatbox/chatbox.component';
import { ChatComponent } from '../shared/components/chat/chat.component';
import { InicioComponent } from '../pages/inicio/inicio.component';
import { LoginComponent } from '../core/components/login/login.component';

export const routes: Routes = [
  {
    path: "login",//raiz de la app
    pathMatch: 'full',//coincida nombre exacto
    component: LoginComponent
  },
  {
    path: "facturas",//raiz de la app
    pathMatch: 'full',//coincida nombre exacto
    component: FacturasComponent
  },
  {
    path: "",//raiz de la app
    pathMatch: 'full',//coincida nombre exacto
    component: InicioComponent
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

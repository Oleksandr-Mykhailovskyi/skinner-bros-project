import { Routes } from '@angular/router';
import {TemplateComponent} from './components/template/template-component';
import {LoginComponent} from './components/login/login';
import {AuthGuard} from './guards/auth-guard';
import {HomePage} from './components/home-page/home-page';
import {Sidebar} from './components/sidebar/sidebar';

export const routes: Routes = [
  {
    path: '',
    component: Sidebar,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomePage },
      { path: 'template', component: TemplateComponent },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

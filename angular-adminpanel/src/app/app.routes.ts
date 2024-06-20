import {Routes} from '@angular/router';
import {AuthGuard} from "./shared/guards/auth.guard";
import {LoginGuard} from "./shared/guards/login.guard";

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component'),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component'),
    canActivate: [LoginGuard]
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

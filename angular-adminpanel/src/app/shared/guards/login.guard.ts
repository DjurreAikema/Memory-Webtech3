import {inject, Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {

  private router: Router = inject(Router);

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}

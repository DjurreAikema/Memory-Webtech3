import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [],
  template: `
    <button class="main-button-primary" (click)="logout()">Logout</button>
  `,
  styles: ``
})
export class LogoutButtonComponent {
  private router: Router = inject(Router);

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

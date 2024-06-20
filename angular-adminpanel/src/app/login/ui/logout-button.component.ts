import {Component, inject} from '@angular/core';
import {AuthService} from "../data-access/auth.service";

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [],
  template: `
    <button class="main-button-primary" (click)="authService.logoutUser$.next()">Logout</button>
  `,
  styles: ``
})
export class LogoutButtonComponent {

  public authService: AuthService = inject(AuthService);

}

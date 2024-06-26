import {Component, inject} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {AuthService} from "./data-access/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule],
  template: `
    <form class="login-form" (submit)="loginUser(username.value, password.value, $event)">
      <mat-form-field appearance="fill">
        <mat-label>Username</mat-label>
        <input matInput type="text" #username required value="Henk">
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Password</mat-label>
        <input matInput type="password" #password required value="henk">
      </mat-form-field>
      <button type="submit" class="main-button-primary">Login</button>
    </form>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: rgb(84, 109, 120);
    }

    .login-form {
      display: flex;
      flex-direction: column;
      width: 300px;

      background-color: white;
      padding: 50px;
      border-radius: 5px;
    }
  `]
})
export default class LoginComponent {

  public authService: AuthService = inject(AuthService);

  public loginUser(username: string, password: string, event: Event): void {
    event.preventDefault();
    this.authService.loginFormSubmitted$.next([username, password]);
  }
}

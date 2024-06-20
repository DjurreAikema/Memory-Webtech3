import {Component, inject} from '@angular/core';
import {LogoutButtonComponent} from "../../login/ui/logout-button.component";
import {AuthService} from "../../login/data-access/auth.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    LogoutButtonComponent
  ],
  template: `
    <nav class="navbar">
      <h1 class="hide">Admin Panel</h1>
      <h1>Welkom, {{authService.username()}}</h1>
      <app-logout-button/>
    </nav>
  `,
  styles: [`
    @media(max-width: 600px) {
      .hide {
        display: none;
      }
    }

    .navbar {
      height: 100%;

      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      gap: 20px;

      padding: 10px 20px;
      color: white;
      background-color: rgb(84, 109, 120);
    }

    h1 {
      margin: 0;
    }
  `]
})
export class NavbarComponent {

  public authService: AuthService = inject(AuthService)

}

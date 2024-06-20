import {Component} from '@angular/core';
import {LogoutButtonComponent} from "../../shared/components/logout-button.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    LogoutButtonComponent
  ],
  template: `
    <nav class="navbar">
      <h1>Admin Panel</h1>
      <h1></h1>
      <app-logout-button/>
    </nav>
  `,
  styles: [`
    .navbar {
      height: 100%;

      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      gap: 20px;

      padding: 0 20px;
      color: white;
      background-color: rgb(84, 109, 120);
    }

    h1 {
      margin: 0;
    }
  `]
})
export class NavbarComponent {
}

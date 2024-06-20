import { Component } from '@angular/core';
import {LogoutButtonComponent} from "../shared/components/logout-button.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LogoutButtonComponent
  ],
  template: `
    <p>
      home works!
    </p>

    <app-logout-button/>
  `,
  styles: ``
})
export default class HomeComponent {

}

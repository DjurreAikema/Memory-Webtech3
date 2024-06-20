import {Component, inject} from '@angular/core';
import {LogoutButtonComponent} from "../shared/components/logout-button.component";
import {AggregateService} from "./data-access/aggregate.service";
import {JsonPipe} from "@angular/common";
import {DatesService} from "./data-access/dates.service";
import {PlayersService} from "./data-access/players.service";
import {NavbarComponent} from "./ui/navbar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LogoutButtonComponent,
    JsonPipe,
    NavbarComponent
  ],
  template: `
    <div class="home-container">

      <app-navbar class="navbar"/>

      <section class="aggregate">
        a
      </section>

      <section class="dates">
        b
      </section>

      <section class="players">
        c
      </section>

    </div>
  `,
  styles: [`
    .home-container {
      height: 100dvh;
      width: 100dvw;

      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
      grid-template-rows: 60px minmax(0, 1fr);
      grid-template-areas:
        "navbar navbar navbar"
        "aggregate dates players";

      justify-items: stretch;
      align-items: stretch;

      justify-content: stretch;
      align-content: stretch;
    }

    .navbar {
      grid-area: navbar;
    }

    .aggregate {
      grid-area: aggregate;
    }

    .dates {
      grid-area: dates;
    }

    .players {
      grid-area: players;
    }
  `]
})
export default class HomeComponent{

  public aggregateService: AggregateService = inject(AggregateService);
  public datesService: DatesService = inject(DatesService);
  public playersService: PlayersService = inject(PlayersService);
}

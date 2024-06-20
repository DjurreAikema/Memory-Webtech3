import {Component, effect, inject} from '@angular/core';
import {LogoutButtonComponent} from "../shared/components/logout-button.component";
import {AggregateService} from "./data-access/aggregate.service";
import {JsonPipe} from "@angular/common";
import {DatesService} from "./data-access/dates.service";
import {PlayersService} from "./data-access/players.service";
import {NavbarComponent} from "./ui/navbar.component";
import {PlayerListComponent} from "./ui/player-list.component";
import {DateListComponent} from "./ui/date-list.component";
import {AggregateComponent} from "./ui/aggregate.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LogoutButtonComponent,
    JsonPipe,
    NavbarComponent,
    PlayerListComponent,
    DateListComponent,
    AggregateComponent
  ],
  template: `
    <div class="home-container">

      <app-navbar class="navbar"/>

      <section class="aggregate">
        <app-aggregate [loading]="aggregateService.loading()" [aggregate]="aggregateService.aggregate()"/>
      </section>

      <section class="dates">
        <app-date-list [loading]="datesService.loading()" [dates]="datesService.dates()"/>
      </section>

      <section class="players">
        <app-player-list [loading]="playersService.loading()" [players]="playersService.players()"/>
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
      padding: 10px;
    }

    .dates {
      grid-area: dates;
      padding: 10px;
    }

    .players {
      grid-area: players;
      padding: 10px;
    }
  `]
})
export default class HomeComponent {

  public datesService: DatesService = inject(DatesService);
  public playersService: PlayersService = inject(PlayersService);
  public aggregateService: AggregateService = inject(AggregateService);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  constructor() {
    effect((): void => {
      this.checkAndOpenSnackBar(this.datesService.error());
      this.checkAndOpenSnackBar(this.playersService.error());
      this.checkAndOpenSnackBar(this.aggregateService.error());
    });
  }

  private checkAndOpenSnackBar(error: string | null): void {
    if (error != null) {
      this.snackBar.open(error, 'X', {duration: 2000, panelClass: ['snackbar-danger']});
    }
  }

}

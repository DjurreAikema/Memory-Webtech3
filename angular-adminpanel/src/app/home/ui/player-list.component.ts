import {Component, input, InputSignal} from '@angular/core';
import {Player} from "../../shared/interfaces";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [
    MatProgressSpinner
  ],
  template: `
    <h1>Players:</h1>
    <hr>

    @if (loading()) {
      <mat-progress-spinner mode="indeterminate" diameter="50"/>
    } @else {

      @for (player of players(); track player.email) {
        <div class="player">
          <div class="item"><span class="bold">Username: </span>{{ player.username }}</div>
          <div class="item"><span class="bold">Email: </span>{{ player.email }}</div>
        </div>
      } @empty {
        <div class="player">
          <div class="item"><span class="bold">No players found!</span></div>
        </div>
      }

    }
  `,
  styles: [`
    hr {
      width: 95%
    }

    .player {
      display: flex;
      flex-flow: row nowrap;

      padding: 20px;
      font-size: 1rem;
    }

    .item {
      flex: 1;
    }
  `]
})
export class PlayerListComponent {

  loading: InputSignal<boolean> = input.required<boolean>();
  players: InputSignal<Player[]> = input.required<Player[]>();

}

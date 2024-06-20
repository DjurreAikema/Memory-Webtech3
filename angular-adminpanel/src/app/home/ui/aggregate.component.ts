import {Component, input, InputSignal} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {Aggregate} from "../../shared/interfaces";

@Component({
  selector: 'app-aggregate',
  standalone: true,
  imports: [
    JsonPipe,
    MatProgressSpinner
  ],
  template: `
    <h1>Aggregate:</h1>
    <hr>

    @if (loading() || !aggregate()) {
      <mat-progress-spinner mode="indeterminate" diameter="50"/>
    } @else {

      <div class="aggregate-container">
        <div class="game-count">
          <div class="item"><span class="bold">Aantal spellen: </span>{{ aggregate()!.aantal_spellen }}</div>
        </div>

        <div class="player-count">
          <div class="item"><span class="bold">Aantal spelers: </span>{{ aggregate()!.aantal_spelers }}</div>
        </div>

        @for (api of aggregate()?.aggregateApi; track api.api) {
          <div class="api">
            <div class="item"><span class="bold">Api: </span>{{ api.api }}</div>
            <div class="item"><span class="bold">Aantal: </span>{{ api.aantal }}</div>
          </div>
        } @empty {
          <div class="player">
            <div class="item"><span class="bold">No Api's found!</span></div>
          </div>
        }
      </div>

    }
  `,
  styles: [`
    :host {
      height: 100%;
    }

    hr {
      width: 95%
    }

    .aggregate-container {
      display: flex;
      flex-flow: column nowrap;
    }

    .game-count, .player-count, .api {
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
export class AggregateComponent {

  loading: InputSignal<boolean> = input.required<boolean>();
  aggregate: InputSignal<Aggregate | null> = input.required<Aggregate | null>();

}

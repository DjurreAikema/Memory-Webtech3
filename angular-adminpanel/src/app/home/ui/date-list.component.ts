import {Component, input, InputSignal} from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {DatePipe, JsonPipe} from "@angular/common";
import {DateCount} from "../../shared/interfaces";

@Component({
  selector: 'app-date-list',
  standalone: true,
  imports: [
    MatProgressSpinner,
    JsonPipe,
    DatePipe
  ],
  template: `
    <h1>Dates:</h1>
    <hr>

    @if (loading()) {
      <mat-progress-spinner mode="indeterminate" diameter="50"/>
    } @else {

      @for (date of dates(); track $index) {
        <div class="date">
          <div class="item"><span class="bold">Datum: </span>{{ date.date | date: "dd-MM-yyy" }}</div>
          <div class="item"><span class="bold">Aantal: </span>{{ date.count }}</div>
        </div>
      } @empty {
        <div class="date">
          <div class="item"><span class="bold">No dates found!</span></div>
        </div>
      }

    }
  `,
  styles: [`
    hr {
      width: 95%
    }

    .date {
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
export class DateListComponent {

  loading: InputSignal<boolean> = input.required<boolean>();
  dates: InputSignal<DateCount[]> = input.required<DateCount[]>();

}

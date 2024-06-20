import {Component, input, InputSignal} from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-date-list',
  standalone: true,
  imports: [
    MatProgressSpinner,
    JsonPipe
  ],
  template: `
    <h1>Dates:</h1>
    <hr>

    @if (loading()) {
      <mat-progress-spinner mode="indeterminate" diameter="50"/>
    } @else {

      <pre>{{ dates() | json }}</pre>
      <!--      @for (date of dates(); track $index) {-->
        <!--        <div class="date">-->
        <!--          {{ date }}-->
        <!--        </div>-->
        <!--      } @empty {-->
        <!--        <div class="date">-->
        <!--          <div class="item"><span class="bold">No dates found!</span></div>-->
        <!--        </div>-->
        <!--      }-->

    }
  `,
  styles: [`
    hr {
      width: 95%
    }
  `]
})
export class DateListComponent {

  loading: InputSignal<boolean> = input.required<boolean>();
  dates: InputSignal<Date[]> = input.required<Date[]>();

}

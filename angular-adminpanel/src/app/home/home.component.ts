import {Component, inject, OnInit} from '@angular/core';
import {LogoutButtonComponent} from "../shared/components/logout-button.component";
import {AggregateService} from "./data-access/aggregate.service";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LogoutButtonComponent,
    JsonPipe
  ],
  template: `
    <p>
      home works!
    </p>

<!--    <pre>{{ aggregateService.aggregate() | json }}</pre>-->
<!--    <pre>{{ aggregateService.aggregate()?.aantal_spelers | json }}</pre>-->
<!--    <pre>{{ aggregateService.aggregate()?.aantal_spellen | json }}</pre>-->
<!--    <pre>{{ aggregateService.aggregate()?.aggregateApi | json }}</pre>-->

    <app-logout-button/>
  `,
  styles: ``
})
export default class HomeComponent implements OnInit {

  // private http: HttpClient = inject(HttpClient);
  public aggregateService: AggregateService = inject(AggregateService);

  ngOnInit() {
    // this.http.get("/api/admin/aggregate").subscribe(res => console.log(res))
    // this.http.get("/api/admin/players").subscribe(res => console.log(res))
    // this.http.get("/api/admin/dates").subscribe(res => console.log(res))
  }
}

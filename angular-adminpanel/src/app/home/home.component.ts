import {Component, inject, OnInit} from '@angular/core';
import {LogoutButtonComponent} from "../shared/components/logout-button.component";
import {HttpClient} from "@angular/common/http";

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
export default class HomeComponent implements OnInit {

  private http: HttpClient = inject(HttpClient);

  ngOnInit() {
    this.http.get("/api/admin/aggregate").subscribe(res => console.log(res))
    this.http.get("/api/admin/players").subscribe(res => console.log(res))
    this.http.get("/api/admin/dates").subscribe(res => console.log(res))
  }
}

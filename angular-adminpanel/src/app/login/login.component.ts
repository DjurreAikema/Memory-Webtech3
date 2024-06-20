import {Component, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  template: `
    <form (submit)="login(username.value, password.value, $event)">
      <input type="text" #username placeholder="Username" required value="Henk">
      <input type="password" #password placeholder="Password" required value="henk">
      <button type="submit">Login</button>
    </form>
  `,
  styles: ``
})
export default class LoginComponent {

  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  public login(username: string, password: string, event: Event): void {
    event.preventDefault();
    this.http.post('/api/login_check', {username, password})
      .subscribe((response: any): void => {
        console.log(response);
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']);
        }
      });
  }
}

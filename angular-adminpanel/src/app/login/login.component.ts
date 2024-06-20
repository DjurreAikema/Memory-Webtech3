import {Component, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  template: `
    <form (submit)="login(username.value, password.value)">
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

  public login(username: string, password: string) {
    this.http.post('http://localhost:8000/api/login_check', {username, password})
      .subscribe((response: any): void => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']);
        }
      });
  }

}

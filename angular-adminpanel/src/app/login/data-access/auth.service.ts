import {Injectable, inject, WritableSignal, signal, Signal, computed} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {EMPTY, map, Observable, of, Subject, switchMap} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {jwtDecode} from "jwt-decode";

export interface AuthState {
  username: string;
  isAuthenticated: boolean;
  expiryTime: string;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private router: Router = inject(Router);
  private http: HttpClient = inject(HttpClient);

  // --- State
  private state: WritableSignal<AuthState> = signal<AuthState>({
    username: "",
    isAuthenticated: false,
    expiryTime: "",
    error: null
  });


  // --- Selectors
  public username: Signal<string> = computed(() => this.state().username);
  public isAuthenticated: Signal<boolean> = computed(() => this.state().isAuthenticated);
  public expiryTime: Signal<string> = computed(() => this.state().expiryTime);
  public error: Signal<string | null> = computed(() => this.state().error);


  // --- Sources
  loginFormSubmitted$: Subject<[string, string]> = new Subject<[string, string]>();
  private checkToken$: Observable<string | null> = this.checkToken();
  private loginUser$: Observable<string> = this.loginFormSubmitted$.pipe(
    switchMap((res: [string, string]) => {
      return this.login(res[0], res[1]).pipe();
    }),
  );
  logoutUser$: Subject<void> = new Subject<void>();
  private error$: Subject<string | null> = new Subject<string | null>();


  // --- Reducers
  constructor() {
    // checkToken$ reducer
    this.checkToken$.pipe(takeUntilDestroyed()).subscribe({
      next: (token: string | null): void => {
        if (!token) return;
        const decoded: any = jwtDecode(token);
        this.state.update((state: AuthState) => ({
          ...state,
          username: decoded.username,
          isAuthenticated: true,
          expiryTime: decoded.exp
        }));
      },
      error: (err) => this.state.update((state: AuthState) => ({...state, error: err}))
    });

    // loginUser$ reducer
    this.loginUser$.pipe(takeUntilDestroyed()).subscribe({
      next: (response: any): void => {
        const decoded: any = jwtDecode(response.token);
        this.state.update((state: AuthState) => ({
          ...state,
          username: decoded.username,
          isAuthenticated: true,
          expiryTime: decoded.exp
        }));

        this.setJwtLocalStorage(response.token);
        this.router.navigate(['/']);
      },
      error: (err) => this.state.update((state: AuthState) => ({...state, error: err}))
    });

    // logoutUser$ reducer
    this.logoutUser$.pipe(takeUntilDestroyed()).subscribe((): void => {
      this.state.update(() => ({
        username: "",
        isAuthenticated: false,
        expiryTime: "",
        error: null
      }));

      this.removeJwtLocalStorage();
      this.router.navigate(['/login']);
    });

    // error$ reducer
    this.error$.pipe(takeUntilDestroyed()).subscribe((error: string | null) =>
      this.state.update((state: AuthState) => ({
        ...state,
        error,
      })),
    );
  }


  // --- Functions
  private login(username: string, password: string): Observable<any> {
    return this.http.post('/api/login_check', {username, password})
      .pipe(
        catchError((err) => {
          this.handleError(err);
          return EMPTY;
        }),
        map((response: any) => {
          return response
        }),
      );
  }

  private setJwtLocalStorage(token: string): void {
    localStorage.setItem('token', token);
  }

  private removeJwtLocalStorage(): void {
    localStorage.removeItem('token');
  }

  private checkToken(): Observable<string | null> {
    const token: string | null = localStorage.getItem('token');
    return of(token);
  }

  private handleError(err: HttpErrorResponse): void {
    if (err.status === 404 && err.url) {
      this.error$.next(`Failed to load: ${err.url}`);
      return;
    }

    this.error$.next(err.statusText);
  }
}

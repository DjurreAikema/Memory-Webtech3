import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, EMPTY, map, Observable, Subject} from "rxjs";

export interface DateState {
  dates: Date[];
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  private http: HttpClient = inject(HttpClient);

  // --- State
  private state: WritableSignal<DateState> = signal<DateState>({
    dates: [],
    loading: true,
    error: null
  });


  // --- Selectors
  public dates: Signal<Date[]> = computed(() => this.state().dates);
  public loading: Signal<boolean> = computed(() => this.state().loading);
  public error: Signal<string | null> = computed(() => this.state().error);


  // --- Sources
  datesLoaded$: Observable<Date[]> = this.getDates();
  private error$: Subject<string | null> = new Subject<string | null>();


  // --- Reducers
  constructor() {
    // datesLoaded$ reducer
    this.datesLoaded$.subscribe({
      next: (dates: Date[]) =>
        this.state.update((state: DateState) => ({
          ...state,
          dates,
          loading: false
        })),
      error: (err) => this.state.update((state: DateState) => ({...state, error: err}))
    });

    // error$ reducer
    this.error$.subscribe((error: string | null) =>
      this.state.update((state: DateState) => ({
        ...state,
        error,
      })),
    );
  }


  // --- Functions
  private getDates(): Observable<Date[]> {
    return this.http.get<Date[]>(`/api/admin/dates`)
      .pipe(
        catchError((err) => {
          this.handleError(err);
          return EMPTY;
        }),
        map((response: Date[]) => {
          // console.log(response);
          return response;
        }),
      );
  }

  private handleError(err: HttpErrorResponse): void {
    if (err.status === 404 && err.url) {
      this.error$.next(`Failed to load: ${err.url}`);
      return;
    }

    this.error$.next(err.statusText);
  }
}

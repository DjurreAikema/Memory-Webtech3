import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, EMPTY, map, Observable, Subject} from "rxjs";
import {DateCount, DateResponse} from "../../shared/interfaces";

export interface DateState {
  dates: DateCount[];
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
  public dates: Signal<DateCount[]> = computed(() => this.state().dates);
  public loading: Signal<boolean> = computed(() => this.state().loading);
  public error: Signal<string | null> = computed(() => this.state().error);


  // --- Sources
  datesLoaded$: Observable<DateCount[]> = this.getDates();
  private error$: Subject<string | null> = new Subject<string | null>();


  // --- Reducers
  constructor() {
    // datesLoaded$ reducer
    this.datesLoaded$.subscribe({
      next: (dates: DateCount[]) =>
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
  private getDates(): Observable<DateCount[]> {
    return this.http.get<DateResponse>(`/api/admin/dates`)
      .pipe(
        catchError((err) => {
          this.handleError(err);
          return EMPTY;
        }),
        map((response: DateResponse) => {
          return this.mapResponseToDateCount(response);
        }),
      );
  }

  private mapResponseToDateCount(response: DateResponse): DateCount[] {
    return Object.keys(response).map(key => ({
      date: new Date(key),
      count: response[key]
    }));
  }

  private handleError(err: HttpErrorResponse): void {
    if (err.status === 404 && err.url) {
      this.error$.next(`Failed to load: ${err.url}`);
      return;
    }

    this.error$.next(err.statusText);
  }
}

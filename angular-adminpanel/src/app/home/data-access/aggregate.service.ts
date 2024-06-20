import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {Aggregate} from "../../shared/interfaces";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, EMPTY, map, Observable, Subject} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

export interface AggregateState {
  aggregates: Aggregate[];
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AggregateService {

  private http: HttpClient = inject(HttpClient);

  // --- State
  private state: WritableSignal<AggregateState> = signal<AggregateState>({
    aggregates: [],
    loading: true,
    error: null
  });


  // --- Selectors
  public aggregates: Signal<Aggregate[]> = computed(() => this.state().aggregates);
  public loading: Signal<boolean> = computed(() => this.state().loading);
  public error: Signal<string | null> = computed(() => this.state().error);


  // --- Sources
  aggregatesLoaded$: Observable<Aggregate[]> = this.getAggregates();
  private error$: Subject<string | null> = new Subject<string | null>();


  // --- Reducers
  constructor() {
    // aggregatesLoaded$ reducer
    this.aggregatesLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (aggregates: Aggregate[]) =>
        this.state.update((state: AggregateState) => ({
          ...state,
          aggregates,
          loading: false
        })),
      error: (err) => this.state.update((state: AggregateState) => ({...state, error: err}))
    });

    // error$ reducer
    this.error$.pipe(takeUntilDestroyed()).subscribe((error: string | null) =>
      this.state.update((state: AggregateState) => ({
        ...state,
        error,
      })),
    );
  }


  // --- Functions
  private getAggregates(): Observable<Aggregate[]> {
    return this.http.get<Aggregate[]>(`/api/admin/aggregate`)
      .pipe(
        catchError((err) => {
          this.handleError(err);
          return EMPTY;
        }),
        map((response: Aggregate[]) => {
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

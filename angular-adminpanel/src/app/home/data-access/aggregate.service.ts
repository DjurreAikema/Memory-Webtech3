import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {Aggregate} from "../../shared/interfaces";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, EMPTY, map, Observable, Subject} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

export interface AggregateState {
  aggregate: Aggregate | null;
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
    aggregate: null,
    loading: true,
    error: null
  });


  // --- Selectors
  public aggregate: Signal<Aggregate | null> = computed(() => this.state().aggregate);
  public loading: Signal<boolean> = computed(() => this.state().loading);
  public error: Signal<string | null> = computed(() => this.state().error);


  // --- Sources
  aggregateLoaded$: Observable<Aggregate> = this.getAggregate();
  private error$: Subject<string | null> = new Subject<string | null>();


  // --- Reducers
  constructor() {
    // aggregatesLoaded$ reducer
    this.aggregateLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (aggregate: Aggregate) =>
        this.state.update((state: AggregateState) => ({
          ...state,
          aggregate,
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
  private getAggregate(): Observable<Aggregate> {
    return this.http.get<any[]>(`/api/admin/aggregate`)
      .pipe(
        catchError((err) => {
          this.handleError(err);
          return EMPTY;
        }),
        map((response: any[]) => {
          return this.mapResponseToAggregate(response);
        }),
      );
  }

  private mapResponseToAggregate(response: any[]): Aggregate {
    return {
      aantal_spellen: response[0].aantal_spellen,
      aantal_spelers: response[1].aantal_spelers,
      aggregateApi: response[2].map((item: any) => ({
        api: item.api,
        aantal: item.aantal
      }))
    };
  }

  private handleError(err: HttpErrorResponse): void {
    if (err.status === 404 && err.url) {
      this.error$.next(`Failed to load: ${err.url}`);
      return;
    }

    this.error$.next(err.statusText);
  }
}

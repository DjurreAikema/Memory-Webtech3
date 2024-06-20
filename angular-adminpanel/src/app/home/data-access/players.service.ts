import {computed, inject, Injectable, signal, Signal, WritableSignal} from '@angular/core';
import {Player} from "../../shared/interfaces";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, EMPTY, map, Observable, Subject} from "rxjs";

export interface PlayerState {
  players: Player[];
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private http: HttpClient = inject(HttpClient);

  // --- State
  private state: WritableSignal<PlayerState> = signal<PlayerState>({
    players: [],
    loading: true,
    error: null
  });


  // --- Selectors
  public players: Signal<Player[]> = computed(() => this.state().players);
  public loading: Signal<boolean> = computed(() => this.state().loading);
  public error: Signal<string | null> = computed(() => this.state().error);


  // --- Sources
  playersLoaded$ = this.getPlayers();
  private error$: Subject<string | null> = new Subject<string | null>();


  // --- Reducers
  constructor() {
    // playersLoaded$ reducer
    this.playersLoaded$.subscribe({
      next: (players: Player[]) =>
        this.state.update((state: PlayerState) => ({
          ...state,
          players,
          loading: false
        })),
      error: (err) => this.state.update((state: PlayerState) => ({...state, error: err}))
    });

    // error$ reducer
    this.error$.subscribe((error: string | null) =>
      this.state.update((state: PlayerState) => ({
        ...state,
        error,
      })),
    );
  }


  // --- Functions
  private getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`/api/admin/players`)
      .pipe(
        catchError((err) => {
          this.handleError(err);
          return EMPTY;
        }),
        map((response: Player[]) => {
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

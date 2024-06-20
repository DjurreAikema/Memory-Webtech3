export interface Aggregate {
  aantal_spellen: number;
  aantal_spelers: number;
  aggregateApi: AggregateApi[];
}

export interface AggregateApi {
  api: string;
  aantal: number;
}

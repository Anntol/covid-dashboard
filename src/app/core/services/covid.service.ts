import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  ICountries, IGlobal, IHistorical, ITimeLineGlobal
} from '../models/covid-base.models';
import { BASE_URL } from '../../shared/constants/constants';

const COVID_URL = {
  SUMMARY: `${BASE_URL}all`,
  COUNTRIES: `${BASE_URL}countries`,
  HISTORICAL: `${BASE_URL}historical?lastdays=all`,
  HISTGLOBAL: `${BASE_URL}historical/all?lastdays=all`,
};

@Injectable({
  providedIn: 'root',
})
export class CovidService {
  Global!: IGlobal;

  Countries!: ICountries[];

  Historical!: IHistorical[];

  HistGlobal!: ITimeLineGlobal;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  public getAllDataCovidApi(): Observable<[IGlobal, ICountries[], IHistorical[], ITimeLineGlobal]> {
    const joined$ = forkJoin(
      this.http.get<IGlobal>(`${COVID_URL.SUMMARY}`)
        .pipe(tap((response) => {
          this.Global = response
        })),
      this.http.get<ICountries[]>(`${COVID_URL.COUNTRIES}`)
        .pipe(tap((response) => {
          this.Countries = response
        })),
      this.http.get<IHistorical[]>(`${COVID_URL.HISTORICAL}`)
        .pipe(tap((response) => {
          this.Historical = response
        })),
      this.http.get<ITimeLineGlobal>(`${COVID_URL.HISTGLOBAL}`)
        .pipe(tap((response) => {
          this.HistGlobal = response
        })),
    );
    return joined$;
  }
}

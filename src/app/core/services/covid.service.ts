import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, forkJoin, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ICovid19, ICountries, IGlobal, IHistorical } from '../models/covid-base.models';
import { BASE_URL } from '../../shared/constants/constants';

const COVID_URL = {
  SUMMARY: `${BASE_URL}all?yesterday=true`,
  COUNTRIES: `${BASE_URL}countries?yesterday=true`,
  BY_COUNTRY: (country: string) => `${BASE_URL}countries/${country}?yesterday=true`,
  HISTORICAL: (country: string) => `${BASE_URL}historical/${country}?lastdays=all`,
}

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  Global!: IGlobal;
  Countries!: ICountries[];
  Historical!: IHistorical;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

    public getAllDataCovidByParams(country: string): Observable<any> {
      const joined$ = forkJoin(
        this.http.get<IGlobal>((country === 'all')?`${COVID_URL. SUMMARY}`:`${COVID_URL.BY_COUNTRY(country)}`).pipe(
          tap(response =>  this.Global = response)
        ),
         this.http.get<ICountries[]>(`${COVID_URL.COUNTRIES}`).pipe(
          tap(response =>  this.Countries = response)
        ),
        this.http.get<IHistorical>(`${COVID_URL.HISTORICAL(country)}`).pipe(
          tap(response => this.Historical = response)
        )
      )
      return joined$
    }


    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        return of(result as T);
      };
    }
}

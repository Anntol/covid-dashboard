import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';
import { ICovid19, ICountryAddInfo } from '../models/covid-base.models';
import { API_URL_COVID19, API_URL_RESTCOUNTRIES } from '../../shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  public Covid19: ICovid19 = {
    Message: '',
    Global: {
      NewConfirmed: 0,
      TotalConfirmed: 0,
      NewDeaths: 0,
      TotalDeaths: 0,
      NewRecovered: 0,
      TotalRecovered: 0
    },
    Countries: [],
    Date: ''
  };

  public countryAddInfo: ICountryAddInfo[] = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

    public getAllDataCovid(): Observable<ICovid19> {
      return this.http.get<ICovid19>(`${API_URL_COVID19}`)
      .pipe(
       catchError(this.handleError<ICovid19>('getAllDataCovid'))
      );
    }

    public getDataCountries(): Observable<ICountryAddInfo[]> {
      const params: HttpParams = new HttpParams()
        .set('fields', 'name;alpha2Code;population;flag')
      return this.http.get<ICountryAddInfo[]>(`${API_URL_RESTCOUNTRIES}`, { params })
      .pipe(
       catchError(this.handleError<ICountryAddInfo[]>('getAllDataCountries'))
      );
    }

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        return of(result as T);
      };
    }
}

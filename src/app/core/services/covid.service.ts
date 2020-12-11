import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ICovid19 } from '../models/covid-base.models';
import { API_URL_COVID19 } from '../../shared/constants/constants';

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

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

    public getAllData(): Observable<ICovid19> {
      return this.http.get<ICovid19>(`${API_URL_COVID19}`)
      .pipe(
        catchError(this.handleError<ICovid19>('getAllData' ))
      );
    }

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        return of(result as T);
      };
    }
}

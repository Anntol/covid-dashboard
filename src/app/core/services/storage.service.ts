import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ICountries, IGlobal, IHistorical } from '../models/covid-base.models';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private dataGlobal: Subject<IGlobal> = new Subject();

  global$: Observable<IGlobal> = this.dataGlobal.asObservable();

  private dataCountries: Subject<ICountries[]> = new Subject();

  countries$: Observable<ICountries[]> = this.dataCountries.asObservable();

  private dataHistorical: Subject<IHistorical[]> = new Subject();

  historical$: Observable<IHistorical[]> = this.dataHistorical.asObservable();

  setDataGlobal(newValue: IGlobal): void {
    this.dataGlobal.next(newValue);
  }

  setDataCountries(newValue: ICountries[]): void {
    this.dataCountries.next(newValue);
  }

  setDataHistorical(newValue: IHistorical[]): void {
    this.dataHistorical.next(newValue);
  }
}

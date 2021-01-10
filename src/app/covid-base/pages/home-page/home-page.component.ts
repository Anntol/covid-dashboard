import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

import { SubscriptionLike } from 'rxjs';

import {
  ICountries,
  ICountrData,
  IDayData,
  IGlobal,
  IHistorical,
  ITimeLineGlobal,
  IHistData,
} from '../../../core/models/covid-base.models';
import { CovidService } from '../../../core/services/covid.service';
import { StorageService } from '../../../core/services/storage.service';

interface IParams {
  country: string;
  indicatorCovid: string;
  isDataOneDay: boolean;
  isAbsolutPopulation: boolean;
}

interface BlockVisible {
  block__noVisible: boolean;
  block__visible: boolean;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HomePageComponent implements OnInit, OnChanges, OnDestroy {
  Countries!: ICountries[];

  countriesData!: ICountrData[];

  Global!: IGlobal;

  globalData!: IGlobal;

  Historical!: IHistorical[];

  historicalData!: IHistData;

  HistGlobal!: ITimeLineGlobal;

  dataCarts!: IDayData;

  blockId!: number;

  toggleBlock = false;

  title = 'title';

  value = 0;

  dateUpdate = '';

  links = ['Cases', 'Deaths', 'Recovered'];

  @Input() country = 'all';

  @Input() indicatorCovid = 'cases';

  dayToggle = false;

  populationToggle = false;

  subscriptions: SubscriptionLike[] = [];

  params: IParams = {
    country: this.country,
    indicatorCovid: this.indicatorCovid,
    isAbsolutPopulation: this.populationToggle,
    isDataOneDay: this.dayToggle,
  };

  constructor(private covidService: CovidService, private cdr: ChangeDetectorRef, public storage: StorageService) {
    this.subscriptions.push(this.storage.global$.subscribe((data) => {
      this.Global = data
    }));
    this.subscriptions.push(this.storage.countries$.subscribe((data) => {
      this.Countries = data
    }));
      this.subscriptions.push(this.storage.historical$.subscribe((data) => {
      this.Historical = data
    }));
  }

  public setIndicatorCovid(value: string): void {
    this.params.indicatorCovid = value;
    this.getDataGlobal(this.params);
    this.getDataCountries(this.params);
    this.getDataCharts(this.params);
    this.cdr.detectChanges();
  }

  public setCountry(countrySelected: string): void {
    this.params.country = countrySelected;
    this.getDataGlobal(this.params);
    this.getDataCountries(this.params);
    this.getDataCharts(this.params);
    this.cdr.detectChanges();
  }

  openFullScreen(e: Event): void {
    const target = e.target as HTMLElement;
    if (!target.classList.contains('full')) {
      return;
    }
    this.toggleBlock = !this.toggleBlock;
    this.blockId = Number(target.parentElement.id);
  }

  setBlockVisibility(el: number): BlockVisible {
    return {
      block__noVisible: el !== this.blockId && this.toggleBlock,
      block__visible: el === this.blockId,
    };
  }

  ngOnInit(): void {
    this.getAllDataCovid();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.params) {
      if (changes.country || changes.indicatorCovid) {
        this.setCountry(this.country);
        this.setIndicatorCovid(this.indicatorCovid);
      }
    }
  }

  getAllDataCovid(): void {
    this.covidService.getAllDataCovidApi().subscribe(
      (data: [IGlobal, ICountries[], IHistorical[], ITimeLineGlobal]) => {
      [this.Global, this.Countries, this.Historical, this.HistGlobal] = data;
      this.Historical.push({
        updated: this.Global.updated,
        country: 'all',
        province: '',
        timeline: this.HistGlobal,
      });
      this.storage.setDataGlobal(this.Global);
      this.storage.setDataCountries(this.Countries);
      this.storage.setDataHistorical(this.Historical);
      this.getDataCountries(this.params);
      this.getDataCharts(this.params);
      this.getDataGlobal(this.params);
    }
    );
  }

  public getDataCountries(params: IParams): void {
    type Keys = 'cases' | 'deaths' | 'recovered';
    this.countriesData = [];
    const countries: ICountries[] = this.Countries;
    countries.forEach((item) => {
      const { updated } = item;
      const { country } = item;
      const { countryInfo } = item;
      const { population } = item;
      const valueName = `${params.indicatorCovid}`;
      const value = item[valueName as Keys];
      this.countriesData.push({
        updated,
        country,
        countryInfo,
        population,
        valueName,
        value,
      });
    });
    this.cdr.detectChanges();
  }

  public getDataCharts(params: IParams): void {
    type Keys = 'cases' | 'deaths' | 'recovered';
    const historical: IHistorical[] = this.Historical;
    const histByCountry: IHistorical[] = historical.filter((item) => item.country === params.country);
    const { timeline } = histByCountry[0];
    const valueName = `${params.indicatorCovid}`;
    const value = timeline[valueName as Keys];
    this.historicalData = {
      country: histByCountry[0].country,
      valueName,
      value,
    };
    this.cdr.detectChanges();
  }

  public getDataGlobal(params: IParams): void {
    type Keys = 'cases' | 'deaths' | 'recovered';

    if (params.country === 'all') {
      this.globalData = this.Global;
      this.globalData.updated = 0;
      this.globalData.country = params.country;
    } else {
      const tempGlobal: ICountries[] = this.Countries;
      const tempGlobalByCountry: NonNullable<ICountries[]> = tempGlobal.filter((item) => item.country === params.country);
      tempGlobalByCountry.forEach((element) => {
        this.globalData = { ...element };
      });
    }

    if (params.indicatorCovid) {
      this.title = `Total${` ${params.indicatorCovid}`.toUpperCase()}`;
      const keyValue = `${params.indicatorCovid}`;
      this.value = this.Global[keyValue as Keys];
    }
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }
}

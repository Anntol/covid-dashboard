import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef } from '@angular/core';

import { SubscriptionLike } from 'rxjs';

import {
  ICountries,
  ICountrData,
  IDayData,
  IGlobal,
  IHistorical,
  ITimeLineGlobal,
  IHistData } from '../../../core/models/covid-base.models';
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

interface BorderStyle {
  text__blue: boolean;
  text__green: boolean;
  text__red: boolean;
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
  dateUpdate: any = '';
  links = ['Cases', 'Deaths', 'Recovered'];

  @Input() country: string = 'all';
  // @Input() country: string = 'Australia';
  @Input() indicatorCovid: string = 'cases';
  dayToggle: boolean = false;
  populationToggle: boolean = false;

  subscriptions: SubscriptionLike[] = [];

  constructor(
    private covidService: CovidService,
    private cdr: ChangeDetectorRef,
    public storage: StorageService,
    ) {
    this.subscriptions.push(this.storage.global$.subscribe(data => this.Global = data));
    this.subscriptions.push(this.storage.countries$.subscribe(data => this.Countries = data));
    this.subscriptions.push(this.storage.historical$.subscribe(data => this.Historical = data));
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
    const { id } = target.parentElement as HTMLElement;
    this.blockId = Number(id);
  }

  setBlockVisibility(el: any): BlockVisible  {
    return {
      block__noVisible: (el !== this.blockId && this.toggleBlock),
      block__visible: el == this.blockId,
    };
  }

  getSizeBlock(index: number): string | void {
    let style;
    if (this.toggleBlock) {
      style = 'width: calc(100vw - 40px); height: calc(100vh - 144px)';
    } else {
    switch (index) {
      case 1:
        style = 'height: 150px';
        break;
      case 2:
        style = 'height: calc(100vh - 225px)';
        break;
      case 3:
        style = 'height: calc(50vh - 125px)';
        break;
      case 4:
        style = 'height: calc(100vh - 325px)';
        break;
      case 5:
        style = 'height: 50px';
        break;
      case 6:
        style = 'height: calc(50vh - 50px)';
        break;
    }
    return style;
  }
  }

  params: IParams = {
    country: this.country,
    indicatorCovid: this.indicatorCovid,
    isAbsolutPopulation: this.populationToggle,
    isDataOneDay: this.dayToggle,
  }

  public ngOnInit(): void {
    this.getAllDataCovid();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.params) {
      if (changes[`country`] || changes[`indicatorCovid`]) {
        this.setCountry(this.country);
        this.setIndicatorCovid(this.indicatorCovid);
      };
    }
  }

  getAllDataCovid(): void {
    this.covidService.getAllDataCovidApi()
    .subscribe(data => {
      this.Countries = data[1];
      this.Global = data[0];
      this.Historical = data[2];
      this.HistGlobal = data[3];
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
    });
  }

    public getDataCountries(params: IParams): void {
      type keys = 'cases'|'deaths'|'recovered';
      this.countriesData = [];
      const countries: ICountries[] = this.Countries;
      countries.forEach(item => {
        const updated = item.updated;
        const country = item.country;
        const countryInfo = item.countryInfo;
        const population = item.population;
        const valueName = `${params.indicatorCovid}`;
        const value = item[valueName as keys];
        this.countriesData.push({
          updated: updated,
          country: country,
          countryInfo: countryInfo,
          population: population,
          valueName: valueName,
          value: value,
        });
      });
      this.cdr.detectChanges();
    }

    public getDataCharts(params: IParams): void {
      type keys = 'cases'|'deaths'|'recovered';
      const historical: IHistorical[] = this.Historical;
      const histByCountry: IHistorical[] = historical.filter(item => item.country === params.country);
      const { timeline } = histByCountry[0];
      const valueName = `${params.indicatorCovid}`;
      const value = timeline[valueName as keys];
      // есть вопрос по TS, как можно наqти частные суммы, если каждый keyValue typeof 'string', а общее к-во их почти 300))
      // const lenTimeLine = Object.keys(temp);
      // lenTimeLine.forEach(keyValue => {
      // for (let i = 0; i < histByCountry.length; i += 1){
      //   type anyKeys = Required<IDayData>;
      //   value += histByCountry[i].timeline[keyValue as anykeys];
      //   console.log(keyValue, value);
      // }
      //});
      this.historicalData = {
        country: histByCountry[0].country,
        valueName: valueName,
        value: value,
      };
      this.cdr.detectChanges();
    }

    public getDataGlobal(params: IParams): void {
      type keys = 'cases'|'deaths'|'recovered';

      if  (params.country === 'all') {
        this.globalData = this.Global;
        this.globalData.updated = 0;
        this.globalData.country = params.country;
      } else {
        const tempGlobal: ICountries[] = this.Countries;
        const tempGlobalByCountry: NonNullable<ICountries[]> = tempGlobal.filter(item => item.country === params.country);
        tempGlobalByCountry.forEach(element => {
         this.globalData = { ...element };

        });
        console.log(this.globalData);
      }

      if (params.indicatorCovid) {
        this.title = 'Total' + ` ${params.indicatorCovid}`.toUpperCase();
        const keyValue = `${params.indicatorCovid}`;
        this.value = this.Global[keyValue as keys];
        this.globalData = this.globalData;
      }
      this.cdr.detectChanges();
    }

    ngOnDestroy() {
      this.subscriptions.forEach(
        (subscription) => subscription.unsubscribe());
      this.subscriptions = [];
    }
}

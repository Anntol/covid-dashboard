import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
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

export class HomePageComponent implements OnInit, OnChanges {
  Countries!: ICountries[];
  countriesData!: ICountrData[];
  Global!: IGlobal;
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
    // this.getDataGlobal(this.params);
    this.getDataCountries(this.params);
    // this.getDataCharts(this.params);
    this.cdr.detectChanges();
  }

  public setCountry(countrySelected: string): void {
    this.params.country = countrySelected;
    // this.getDataGlobal(this.params);
    this.getDataCountries(this.params);
    // this.getDataCharts(this.params);
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
      console.log(this.toggleBlock, style);
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
      console.log('1-',this.countriesData);
    }
      // console.log(this.HistGlobal, this.Historical);

      // console.log(this.countriesData);
      // // global
      // this.title = 'Total' + ` ${this.params.indicatorCovid}`.toUpperCase();
      // const keyValue = `${this.params.indicatorCovid}`;
      // this.value = this.Global[keyValue as keys];
      // // charts
      // if((this.country === 'all') {
      //   this.historicalData = {
      //     country: this.params.country,
      //     valueName: this.params.indicatorCovid,
      //     value: {'fff': 25}
      //     value: this.Historical[keyValue as keys],
      //   }
      // }
      // this.historicalData = {
      //   country: this.params.country,
      //   valueName: this.params.indicatorCovid,
      //   value: {'fff': 25}
      //   value: this.Historical[keyValue as keys],
      // }
      // console.log(this.historicalData);

    // this.cdr.detectChanges()

    ngOnDestroy() {
      this.subscriptions.forEach(
        (subscription) => subscription.unsubscribe());
      this.subscriptions = [];
    }
}

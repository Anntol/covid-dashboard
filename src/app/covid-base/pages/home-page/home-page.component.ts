import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';

import { ICountries, IGlobal, IHistorical } from '../../../core/models/covid-base.models';
import { CovidService } from '../../../core/services/covid.service';

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
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit, OnChanges {
  Countries!: ICountries[];
  Global!: IGlobal;
  Historical!: IHistorical;
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

  constructor(private covidService: CovidService) {
  }

  public getIndicatorCovid(value: string): void {
    this.params.indicatorCovid = value;
    this.getAllDataCovid(this.params.country);
  }

  public setCountry(countrySelected: string): void {
    this.params.country = countrySelected;
    this.getAllDataCovid(this.params.country);
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
    indicatorCovid: this.indicatorCovid ,
    isAbsolutPopulation: this.populationToggle,
    isDataOneDay:this.dayToggle,
  }

  public ngOnInit(): void {
    this.getAllDataCovid(this.params.country);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.indicatorCovid) {
      this.getIndicatorCovid(this.indicatorCovid);
    }
    if (this.country) {
      this.getIndicatorCovid(this.indicatorCovid);
    }
  }

  getAllDataCovid(countryName: string): void {
    this.covidService.getAllDataCovidByParams(countryName)
    .subscribe(data => {
      this.Countries = data[1];
      this.Global = data[0];
      this.Historical = data[2];
      console.log(this.Global, this.Historical)
      type keys = 'cases'|'deaths'|'recovered';
      this.Countries.forEach(country => {
        const keyValue = `${this.params.indicatorCovid}`;
        country['value'] = country[keyValue as keys];
      });
      this.title = 'Total' + ` ${this.params.indicatorCovid}`.toUpperCase();
      const keyValue = `${this.params.indicatorCovid}`;
      this.value = this.Global[keyValue as keys];
      this.dateUpdate = new Date (this.Global.updated);
    });
  }
}

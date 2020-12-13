import { Component, OnInit } from '@angular/core';

import { ICovid19, ICountryAddInfo } from '../../../core/models/covid-base.models';
import { CovidService } from '../../../core/services/covid.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  covidData: ICovid19 = {
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

  countryAddInfo: ICountryAddInfo[] = [];

  constructor(private covidService: CovidService ) { }

  ngOnInit(): void {
    this.getAllDataCovid();
    this.getDataCountries();
  }

  getAllDataCovid(): void {
    this.covidService.getAllDataCovid()
    .subscribe(data => this.covidData = data);
  }

  getDataCountries(): void {
    this.covidService.getDataCountries()
    .subscribe(data => this.countryAddInfo = data);
  }

}

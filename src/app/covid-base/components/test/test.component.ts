import { Component, OnInit } from '@angular/core';

import { ICovid19 } from '../../../core/models/covid-base.models';
import { CovidService } from '../../../core/services/covid.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
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

  constructor(private covidService: CovidService ) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(): void {
    this.covidService.getAllData()
    .subscribe(data => this.covidData = data);
  }

}

import { Component, OnInit } from '@angular/core';

import { ICountries, ICovid19, IGlobal, IHistorical } from '../../../core/models/covid-base.models';
import { CovidService } from '../../../core/services/covid.service';

interface IParams {
  country: string,
  index: string,
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  Countries!: ICountries[];
  Global!: IGlobal;
  Historical!: IHistorical;

  constructor(private covidService: CovidService ) { }

  ngOnInit(): void {
    this.getAllDataCovid({country: 'all', index: ''});
  }

  getAllDataCovid(params: IParams): void {
    this.covidService.getAllDataCovidByParams(params.country)
    .subscribe(data => {
      this.Countries = data[1];
      this.Global = data[0];
      this.Historical = data[2];
      console.log(this.Countries, this.Global, this.Historical);
    });
  }

}

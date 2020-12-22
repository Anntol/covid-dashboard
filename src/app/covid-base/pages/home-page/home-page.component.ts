import { ParsedEvent } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import { ICountries, ICovid19, IGlobal, IHistorical } from '../../../core/models/covid-base.models';
import { CovidService } from '../../../core/services/covid.service';

interface IParams {
  country: string,
  index: string,
}

interface BlockVisible {
  block__noVisible: boolean,
  block__visible: boolean,
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
  blockId!: number;
  toggleBlock: boolean = false;

  constructor(private covidService: CovidService ) { }

  openFullScreen(e: Event): void {
    const target = e.target as HTMLElement;
    if (target.tagName.toLowerCase() !== 'span') {
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
    }
  }

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

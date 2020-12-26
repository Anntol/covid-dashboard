import { Component, OnInit } from '@angular/core';
import { IGlobal } from 'src/app/core/models/covid-base.models';
import { CovidService } from 'src/app/core/services/covid.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  Global!: IGlobal;
  dateUpdate: any = '';
  country = 'all';

  constructor(private covidService: CovidService) {}

  ngOnInit(): void {
    this.getAllDataCovid(this.country);
    console.log(this.getAllDataCovid(this.country));
  }

  getAllDataCovid(countryName: string): void {
    this.covidService.getAllDataCovidByParams(countryName).subscribe(() => {
      this.dateUpdate = new Date (this.Global.updated);
    });
  }

}

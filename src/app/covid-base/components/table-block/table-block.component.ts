import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ICovid19 } from 'src/app/core/models/covid-base.models';

@Component({
  selector: 'app-table-block',
  templateUrl: './table-block.component.html',
  styleUrls: ['./table-block.component.scss']
})
export class TableBlockComponent implements OnInit, OnChanges {

  constructor() { }
  @Input() covidData!: ICovid19;

  ngOnInit(): void {    
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "covidData" changed
    if (changes['covidData']) {
      this.dataSource  = [{
        cases: this.covidData.Global.TotalConfirmed,
        deaths: this.covidData.Global.TotalDeaths,
        recovered: this.covidData.Global.TotalRecovered
      }]
    }
  }

  tableColumns:  string[] = ['cases', 'deaths', 'recovered'];

  dataSource  = [{
    cases: 0,
    deaths: 0,
    recovered: 0
  }]
}

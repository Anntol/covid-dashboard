import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { IGlobal } from 'src/app/core/models/covid-base.models';

@Component({
  selector: 'app-table-block',
  templateUrl: './table-block.component.html',
  styleUrls: ['./table-block.component.scss']
})

export class TableBlockComponent implements OnChanges {
  labels: string[] = ['Cases', 'Deaths', 'Recovered'];
  dataColumns: string[] = ['cases', 'deaths', 'recovered'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayColumns: string[] = [];
  displayData: any[] = [];
  inputData: any[] = [];
  title = '';

  @Input() globalData!: IGlobal;
  @Input() dayToggle!: boolean;
  @Input() populationToggle!: boolean;
  @Output() populationToggleChange = new EventEmitter<boolean>();
  @Output() dayToggleChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.globalData) {
      if (changes[`globalData`] || changes[`dayToggle`] || changes[`populationToggle`] ) {
        const cases = this.dayToggle ? this.globalData.todayCases : this.globalData.cases;
        const deaths = this.dayToggle ? this.globalData.todayDeaths : this.globalData.deaths;
        const recovered = this.dayToggle ? this.globalData.todayRecovered : this.globalData.recovered;
        const populationDivider = 100000;

        const globalData: ITableElement = {
          cases: this.populationToggle ? cases / populationDivider : cases,
          deaths: this.populationToggle ? deaths / populationDivider : deaths,
          recovered: this.populationToggle ? recovered / populationDivider : recovered
        };
        this.inputData = [globalData];

        this.transpose();
        this.fillLabels();
        this.getTitle();
      }
    }
  }

  // idea from https://stackblitz.com/edit/angular-cjskob?file=src%2Fapp%2Ftable.component.ts
  transpose(): void {
    const transposedData: any[] = [];
    for (let column = 0; column < this.dataColumns.length; column += 1) {
      transposedData[column] = {
        label: this.labels[column]
      };
      for (let row = 0; row < this.inputData.length; row += 1) {
        transposedData[column][`column${row}`] = this.inputData[row][this.dataColumns[column]];
      }
    }
    this.dataSource = new MatTableDataSource(transposedData);
  }

  fillLabels(): void {
    this.displayColumns = ['label'];
    for (let i = 0; i < this.inputData.length; i++) {
      this.displayColumns.push('column' + i);
    }
  }

  getTitle(): void {
    const dayPart = this.dayToggle ? 'Today' : 'All';
    const populationPart = this.populationToggle ? 'per 100k population' : '';
    const countryPart = 'for world'; // TODO Country

    this.title = `${dayPart} data ${populationPart} ${countryPart}`;
  }

  toggleDay(e: MatSlideToggleChange): void {
    this.dayToggleChange.emit(e.checked);
  }

  togglePopulation(e: MatSlideToggleChange): void {
    this.populationToggleChange.emit(e.checked);
  }
}

export interface ITableElement {
  cases: number;
  deaths: number;
  recovered: number;
}

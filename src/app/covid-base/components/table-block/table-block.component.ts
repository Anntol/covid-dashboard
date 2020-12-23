import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { IGlobal } from 'src/app/core/models/covid-base.models';

@Component({
  selector: 'app-table-block',
  templateUrl: './table-block.component.html',
  styleUrls: ['./table-block.component.scss']
})

export class TableBlockComponent implements OnInit, OnChanges {
  labels: string[] = ['Cases', 'Deaths', 'Recovered'];
  dataColumns: string[] = ['cases', 'deaths', 'recovered'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource;
  displayColumns: string[] = [];
  displayData: any[] = [];
  inputData: any[] = [];
  
  @Input() globalData!: IGlobal;

  constructor() { }

  ngOnInit(): void {    
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.globalData) {
      if (changes['globalData'] || changes['dayToggle'] || changes['populationToggle'] ) {
        //console.log('gl!', this.globalData, this.dayToggle);
        const cases = this.dayToggle ? this.globalData.todayCases : this.globalData.cases;
        const deaths = this.dayToggle ? this.globalData.todayDeaths : this.globalData.deaths;
        const recovered = this.dayToggle ? this.globalData.todayRecovered : this.globalData.recovered;
        const populationDivider = 100000;

        const globalData: ITableElement = {
          cases: this.populationToggle ? cases / populationDivider : cases,
          deaths: this.populationToggle ? deaths / populationDivider : deaths,
          recovered: this.populationToggle ? recovered / populationDivider :recovered
        };
        this.inputData = [globalData];
        //console.log(this.inputData);

        this.transpose();
        this.fillLabels();
      }
    }
  } 

  // idea from https://stackblitz.com/edit/angular-cjskob?file=src%2Fapp%2Ftable.component.ts
  transpose() {
    let transposedData: any[] = [];
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

  fillLabels() {
    this.displayColumns = ['label'];
    for (let i = 0; i < this.inputData.length; i++) {
      this.displayColumns.push('column' + i);
    }
  }

  @Input() dayToggle!: boolean;
  @Output() dayToggleChange = new EventEmitter<boolean>();  
  toggleDay(e: MatSlideToggleChange) {
    this.dayToggleChange.emit(e.checked);
  }

  @Input() populationToggle!: boolean;
  @Output() populationToggleChange = new EventEmitter<boolean>();  
  togglePopulation(e: MatSlideToggleChange) {
    this.populationToggleChange.emit(e.checked);
  }
}

export interface ITableElement {
  cases: number;
  deaths: number;
  recovered: number;
}

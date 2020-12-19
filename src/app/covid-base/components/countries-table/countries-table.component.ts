import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ICountries } from 'src/app/core/models/covid-base.models';

@Component({
  selector: 'app-countries-table',
  templateUrl: './countries-table.component.html',
  styleUrls: ['./countries-table.component.scss']
})
export class CountriesTableComponent implements OnInit{
  constructor() { }

  @Input() covidData!: ICountries[];
  dataSource = new MatTableDataSource<ICountries>(this.covidData);
  displayedColumns: string[] = ['Country', 'TotalConfirmed'];

  ngOnInit(): void {
  }
}

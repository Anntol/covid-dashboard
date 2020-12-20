import { Component, Input, ViewChild, OnInit} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ICountries } from 'src/app/core/models/covid-base.models';

@Component({
  selector: 'app-countries-table',
  templateUrl: './countries-table.component.html',
  styleUrls: ['./countries-table.component.scss']
})
export class CountriesTableComponent implements OnInit{
  @Input() covidData !: ICountries[];
  dataSource = new MatTableDataSource(this.covidData);
  displayedColumns = ['Country', 'TotalConfirmed'];
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor() {}

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

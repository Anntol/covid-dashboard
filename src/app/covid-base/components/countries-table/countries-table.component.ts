import { Component, Input, ViewChild, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ICountries } from 'src/app/core/models/covid-base.models';

@Component({
  selector: 'app-countries-table',
  templateUrl: './countries-table.component.html',
  styleUrls: ['./countries-table.component.scss']
})
export class CountriesTableComponent implements OnInit, OnChanges{
  @Input() Countries!: ICountries[];
  displayedColumns = ['cases', 'flag', 'country'];
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  dataSource!: MatTableDataSource<ICountries>;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.Countries);
    setTimeout(() => this.dataSource.sort = this.sort);
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);
  }
}

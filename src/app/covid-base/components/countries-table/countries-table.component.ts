import { Component, Input, ViewChild, OnInit, OnChanges, SimpleChanges, EventEmitter, Output} from '@angular/core';
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
  searchCountry = '';
  @Output() countrySelected: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.Countries);
    setTimeout(() => this.dataSource.sort = this.sort);
  }

  ngOnInit(): void {}

  selectCountry(country: string): any {
    this.countrySelected.emit(country);
  }
}


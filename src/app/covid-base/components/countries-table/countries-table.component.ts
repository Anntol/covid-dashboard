import { Component, Input, ViewChild, OnInit, OnChanges, SimpleChanges, EventEmitter, Output} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ICountrData } from 'src/app/core/models/covid-base.models';

@Component({
  selector: 'app-countries-table',
  templateUrl: './countries-table.component.html',
  styleUrls: ['./countries-table.component.scss']
})
export class CountriesTableComponent implements OnInit, OnChanges{
  @Input() Countries!: ICountrData[];
  displayedColumns = ['cases', 'flag', 'country'];
  dataSource!: MatTableDataSource<ICountrData>;
  searchCountry = '';
  SortDirection = 'desc';
  @Output() countrySelected: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.Countries);
  }

  ngOnInit(): void {}

  // onSortDirection(): any {
  //   if (this.SortDirection === 'desc') {
  //     this.SortDirection = 'asc';
  //   } else {
  //     this.SortDirection = 'desc';
  //   }
  // }

  selectCountry(country: string): any {
    this.countrySelected.emit(country);
  }
}


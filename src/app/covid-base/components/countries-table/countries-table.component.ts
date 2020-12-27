import {
  Component,
  Input,
  ViewChild,
  OnInit,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
  AfterViewInit,
  ViewEncapsulation
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ICountries } from 'src/app/core/models/covid-base.models';
import Keyboard from 'simple-keyboard';

@Component({
  selector: 'app-countries-table',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './countries-table.component.html',
  styleUrls: [
    './countries-table.component.scss',
    '/node_modules/simple-keyboard/build/css/index.css'
  ]
})
export class CountriesTableComponent implements OnInit, OnChanges, AfterViewInit{

  displayedColumns = ['cases', 'flag', 'country'];
  dataSource!: MatTableDataSource<ICountries>;
  searchCountry = '';
  keyboard!: Keyboard;
  isShown = false;

  @Input() Countries!: ICountries[];
  @Output() countrySelected: EventEmitter<string> = new EventEmitter();
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor() {}

  toggleKeyboard(): any{
    this.isShown = !this.isShown;
    console.log(this.isShown);
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.Countries);
  }

  selectCountry(country: string): any {
    this.countrySelected.emit(country);
  }

  ngAfterViewInit(): void {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
      theme: 'hg-theme-default myTheme1'
    });
  }

  onChange = (input: string) => {
    this.searchCountry = input;
  }

  onKeyPress = (button: string) => {
    if (button === '{shift}' || button === '{lock}') { this.handleShift(); }
  }

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  }

  handleShift = () => {
    const currentLayout = this.keyboard.options.layoutName;
    const shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  }

}


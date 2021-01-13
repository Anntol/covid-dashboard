import {
  Component,
  Input,
  ViewChild,
  OnChanges,
  EventEmitter,
  Output,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ICountrData } from 'src/app/core/models/covid-base.models';
import Keyboard from 'simple-keyboard';

@Component({
  selector: 'app-countries-table',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './countries-table.component.html',
  styleUrls: ['./countries-table.component.scss', '/node_modules/simple-keyboard/build/css/index.css'],
})
export class CountriesTableComponent implements OnChanges, AfterViewInit {
  displayedColumns = ['cases', 'flag', 'country'];

  dataSource!: MatTableDataSource<ICountrData>;

  searchCountry = '';

  keyboard!: Keyboard;

  isShown = false;

  @Input() Countries!: ICountrData[];

  @Output() countrySelected = new EventEmitter<string>();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  toggleKeyboard(): void {
    this.isShown = !this.isShown;
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.Countries);
  }

  selectCountry(country: string): void {
    this.countrySelected.emit(country);
  }

  ngAfterViewInit(): void {
    this.keyboard = new Keyboard({
      onChange: (input) => this.onChange(input),
      onKeyPress: (button) => this.onKeyPress(button),
      theme: 'hg-theme-default myTheme1',
    });
  }

  onChange = (input: string): void => {
    this.searchCountry = input;
  };

  onKeyPress = (button: string): void => {
    if (button === '{shift}' || button === '{lock}') {
      this.handleShift();
    }
  };

  onInputChange = (event: Event): void => {
    const input = event.target as HTMLInputElement;
    this.keyboard.setInput(input.value);
  };

  handleShift = (): void => {
    const currentLayout = this.keyboard.options.layoutName;
    const shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

    this.keyboard.setOptions({
      layoutName: shiftToggle,
    });
  };
}

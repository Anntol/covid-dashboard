import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SharedModule } from '../shared/shared.module';
import { ChartsComponent } from './components/charts/charts.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TableBlockComponent } from './components/table-block/table-block.component';
import { CountriesTableComponent } from './components/countries-table/countries-table.component';
import { SearchCountryPipe } from './components/countries-table/search-country.pipe';
import { SortPipe } from './components/countries-table/sort.pipe';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    ChartsComponent,
    HomePageComponent,
    TableBlockComponent,
    CountriesTableComponent,
    SearchCountryPipe,
    SortPipe,
    MapComponent,
  ],

  imports: [CommonModule, SharedModule, MatButtonToggleModule],

  exports: [
    ChartsComponent,
    HomePageComponent,
    TableBlockComponent,
    CountriesTableComponent,
    SearchCountryPipe,
    SortPipe,
    MapComponent,
  ],
})
export class CovidBaseModule {}

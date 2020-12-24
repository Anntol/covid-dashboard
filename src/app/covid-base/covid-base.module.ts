import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TestComponent } from './components/test/test.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TableBlockComponent } from './components/table-block/table-block.component';
import { CountriesTableComponent } from './components/countries-table/countries-table.component';
import { SearchCountryPipe } from './components/countries-table/search-country.pipe';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    TestComponent,
    HomePageComponent,
    TableBlockComponent,
    CountriesTableComponent,
    SearchCountryPipeб
    MapComponent
  ],

  imports: [
    CommonModule,
    SharedModule
  ],

  exports: [
    TestComponent,
    HomePageComponent,
    CountriesTableComponent,
    SearchCountryPipe,
    MapComponent
  ]
})
export class CovidBaseModule { }

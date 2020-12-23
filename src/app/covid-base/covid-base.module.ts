import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TestComponent } from './components/test/test.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TableBlockComponent } from './components/table-block/table-block.component';
import { CountriesTableComponent } from './components/countries-table/countries-table.component';
import { SearchCountryPipe } from './components/countries-table/search-country.pipe';

@NgModule({
  declarations: [TestComponent, HomePageComponent, TableBlockComponent, CountriesTableComponent, SearchCountryPipe],

  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    MatSlideToggleModule
  ],
  exports: [TestComponent, HomePageComponent, CountriesTableComponent, SearchCountryPipe]
})
export class CovidBaseModule { }

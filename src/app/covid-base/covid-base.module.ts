import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TestComponent } from './components/test/test.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TableBlockComponent } from './components/table-block/table-block.component';

@NgModule({
  declarations: [TestComponent, HomePageComponent, TableBlockComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [TestComponent, HomePageComponent]
})
export class CovidBaseModule { }

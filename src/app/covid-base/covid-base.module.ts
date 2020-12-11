import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import  { SharedModule } from '../shared/shared.module';
import { TestComponent } from './components/test/test.component';


@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [TestComponent]
})
export class CovidBaseModule { }

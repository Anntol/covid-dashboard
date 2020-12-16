import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CovidService } from '../core/services/covid.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [PageNotFoundComponent, HeaderComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [CovidService],
  exports: [PageNotFoundComponent, HeaderComponent],
})
export class CoreModule { }

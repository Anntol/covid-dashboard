import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CovidService } from '../core/services/covid.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [PageNotFoundComponent, FooterComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [CovidService],
  exports: [PageNotFoundComponent, FooterComponent],
})
export class CoreModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CovidService } from '../core/services/covid.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { DialogLikeComponent } from './components/dialog-like/dialog-like.component';
import { DialogLikeContentComponent } from './components/dialog-like/dialog-like.component';



@NgModule({
  declarations: [PageNotFoundComponent, HeaderComponent, DialogLikeComponent, DialogLikeContentComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [CovidService],
  exports: [PageNotFoundComponent, HeaderComponent, DialogLikeComponent, DialogLikeContentComponent],
})
export class CoreModule { }

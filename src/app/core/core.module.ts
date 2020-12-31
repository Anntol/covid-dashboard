import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CovidService } from './services/covid.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { DialogLikeComponent, DialogLikeContentComponent } from './components/dialog-like/dialog-like.component';

import { DialogInfoComponent, DialogInfoContentComponent } from './components/dialog-info/dialog-info.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    FooterComponent,
    HeaderComponent,
    DialogLikeComponent,
    DialogLikeContentComponent,
    DialogInfoComponent,
    DialogInfoContentComponent,
  ],
  imports: [CommonModule, SharedModule],
  providers: [CovidService],
  exports: [
    PageNotFoundComponent,
    FooterComponent,
    HeaderComponent,
    DialogLikeComponent,
    DialogLikeContentComponent,
    DialogInfoComponent,
    DialogInfoContentComponent,
  ],
})
export class CoreModule {}

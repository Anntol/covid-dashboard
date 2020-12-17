import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule,
    MatCardModule,
    MatTableModule,
  ],
  exports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule,
    MatCardModule,
    MatTableModule,
  ]
})
export class SharedModule { }

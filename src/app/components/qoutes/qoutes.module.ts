import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QoutesComponent } from './qoutes.component';



@NgModule({
  declarations: [
    QoutesComponent
  ],
  imports: [
    CommonModule
  ], exports: [
    QoutesComponent
  ]
})
export class QoutesModule { }

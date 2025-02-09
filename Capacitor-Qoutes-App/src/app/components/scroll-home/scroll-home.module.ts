import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollHomeComponent } from './scroll-home.component';
import { FormsModule } from '@angular/forms';
import { LoadingModule } from '../loading/loading.module';
import { QouteOverviewModule } from "../qoute-overview/qoute-overview.module";



@NgModule({
  declarations: [ScrollHomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoadingModule,
    QouteOverviewModule
  ], exports: [
    ScrollHomeComponent
  ]
})
export class ScrollHomeModule { }

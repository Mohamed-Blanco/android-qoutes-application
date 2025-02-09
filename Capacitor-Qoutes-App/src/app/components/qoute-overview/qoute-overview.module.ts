import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QouteOverviewComponent } from './qoute-overview.component';



@NgModule({
  declarations: [QouteOverviewComponent],
  imports: [
    CommonModule
  ],
  exports: [QouteOverviewComponent]
})
export class QouteOverviewModule { }

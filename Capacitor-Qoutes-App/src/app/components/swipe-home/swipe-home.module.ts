import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwipeHomeComponent } from './swipe-home.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';




@NgModule({
  declarations: [SwipeHomeComponent],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    CdkDropList,
    CdkDrag
  ],
  exports: [SwipeHomeComponent]
})
export class SwipeHomeModule { }

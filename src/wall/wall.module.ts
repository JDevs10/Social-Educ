import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WallComponent } from './wall.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [WallComponent],
  exports: [
    WallComponent
  ]
})
export class WallModule { }

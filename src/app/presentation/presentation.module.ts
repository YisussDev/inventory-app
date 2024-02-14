import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresentationRoutingModule } from './presentation-routing.module';
import { PresentationComponent } from './presentation.component';


@NgModule({
  declarations: [
    PresentationComponent
  ],
  imports: [
    CommonModule,
    PresentationRoutingModule
  ]
})
export class PresentationModule { }

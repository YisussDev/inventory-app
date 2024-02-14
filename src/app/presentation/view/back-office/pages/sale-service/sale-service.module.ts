import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleServiceRoutingModule } from './sale-service-routing.module';
import { SaleServiceComponent } from './sale-service.component';


@NgModule({
  declarations: [
    SaleServiceComponent
  ],
  imports: [
    CommonModule,
    SaleServiceRoutingModule
  ]
})
export class SaleServiceModule { }

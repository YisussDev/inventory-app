import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductServiceRoutingModule } from './product-service-routing.module';
import { ProductServiceComponent } from './product-service.component';


@NgModule({
  declarations: [
    ProductServiceComponent
  ],
  imports: [
    CommonModule,
    ProductServiceRoutingModule
  ]
})
export class ProductServiceModule { }

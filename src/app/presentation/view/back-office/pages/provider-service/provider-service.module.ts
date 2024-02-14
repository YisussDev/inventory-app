import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderServiceRoutingModule } from './provider-service-routing.module';
import { ProviderServiceComponent } from './provider-service.component';


@NgModule({
  declarations: [
    ProviderServiceComponent
  ],
  imports: [
    CommonModule,
    ProviderServiceRoutingModule
  ]
})
export class ProviderServiceModule { }

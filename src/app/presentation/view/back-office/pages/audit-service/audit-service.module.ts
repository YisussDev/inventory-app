import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditServiceRoutingModule } from './audit-service-routing.module';
import { AuditServiceComponent } from './audit-service.component';


@NgModule({
  declarations: [
    AuditServiceComponent
  ],
  imports: [
    CommonModule,
    AuditServiceRoutingModule
  ]
})
export class AuditServiceModule { }

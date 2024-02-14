import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserServiceRoutingModule } from './user-service-routing.module';
import { UserServiceComponent } from './user-service.component';


@NgModule({
  declarations: [
    UserServiceComponent,
  ],
  imports: [
    CommonModule,
    UserServiceRoutingModule
  ]
})
export class UserServiceModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackOfficeRoutingModule } from './back-office-routing.module';
import { BackOfficeComponent } from './back-office.component';
import {ModalModule} from "../../../shared/components/modal/modal.module";


@NgModule({
  declarations: [
    BackOfficeComponent
  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule,
    ModalModule
  ],
})
export class BackOfficeModule { }

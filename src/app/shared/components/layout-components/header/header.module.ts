import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "./header.component";
import { ViewDataSessionComponent } from './utils/view-data-session/view-data-session.component';
import {ButtonsModule} from "../../buttons/buttons.module";
import {InputsModule} from "../../inputs/inputs.module";


@NgModule({
  declarations: [
    HeaderComponent,
    ViewDataSessionComponent,
  ],
  exports: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    ButtonsModule,
    InputsModule
  ]
})
export class HeaderModule {
}

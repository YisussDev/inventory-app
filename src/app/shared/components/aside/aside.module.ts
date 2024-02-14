import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AsideComponent} from './components/aside/aside.component';
import {ButtonsModule} from "../buttons/buttons.module";
import {InputsModule} from "../inputs/inputs.module";
import {SignsModule} from "../../../presentation/view/back-office/pages/sign-service/signs/signs.module";


@NgModule({
  declarations: [
    AsideComponent
  ],
  exports: [
    AsideComponent
  ],
  imports: [
    CommonModule,
    ButtonsModule,
    InputsModule,
    SignsModule
  ]
})
export class AsideModule {
}

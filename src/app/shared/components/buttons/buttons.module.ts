import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BtnPrimaryComponent} from './components/btn-primary/btn-primary.component';
import {BtnSecondaryComponent} from './components/btn-secondary/btn-secondary.component';
import {ButtonPrimaryComponent} from "./components/button-primary/button-primary.component";
import {ButtonSecondaryComponent} from "./components/button-secondary/button-secondary.component";
import {ButtonSuccesComponent} from "./components/button-succes/button-succes.component";
import {ButtonNeutralComponent} from "./components/button-neutral/button-neutral.component";
import {ButtonDangerComponent} from "./components/button-danger/button-danger.component";


@NgModule({
  declarations: [
    BtnPrimaryComponent,
    BtnSecondaryComponent,
    ButtonPrimaryComponent,
    ButtonSecondaryComponent,
    ButtonSuccesComponent,
    ButtonNeutralComponent,
    ButtonDangerComponent,
  ],
  exports: [
    BtnPrimaryComponent,
    BtnSecondaryComponent,
    ButtonPrimaryComponent,
    ButtonSecondaryComponent,
    ButtonSuccesComponent,
    ButtonNeutralComponent,
    ButtonDangerComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class ButtonsModule {
}

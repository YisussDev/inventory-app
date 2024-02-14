import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginServiceRoutingModule} from './login-service-routing.module';
import {LoginServiceComponent} from './login-service.component';
import {LoginComponent} from './components/login/login.component';
import {ButtonsModule} from "../../../../../shared/components/buttons/buttons.module";
import {InputsModule} from "../../../../../shared/components/inputs/inputs.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthModule} from '../../auth.module';
import {LoginUseCaseModule} from "../../../../../application/use-cases/auth/login/login-use-case.module";


@NgModule({
  declarations: [
    LoginServiceComponent,
    LoginComponent
  ],
  imports: [
    LoginUseCaseModule,
    CommonModule,
    LoginServiceRoutingModule,
    ButtonsModule,
    InputsModule,
    ReactiveFormsModule,
    AuthModule
  ]
})
export class LoginServiceModule {
}

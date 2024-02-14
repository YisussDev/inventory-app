import {NgModule} from "@angular/core";
import {
  LoginImplementation
} from "../../../../infrastructure/adapters/api/implementation/auth/login.implementation";
import {LoginUseCaseService} from "./login-use-case.service";

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    LoginImplementation,
    LoginUseCaseService
  ]
})
export class LoginUseCaseModule {
}

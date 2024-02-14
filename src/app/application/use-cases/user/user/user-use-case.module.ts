import {NgModule} from "@angular/core";
import {
  UserImplementation
} from "../../../../infrastructure/adapters/api/implementation/user/user.implementation";
import {UserUseCaseService} from "./user-use-case.service";

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    UserImplementation,
    UserUseCaseService
  ]
})
export class UserUseCaseModule {
}

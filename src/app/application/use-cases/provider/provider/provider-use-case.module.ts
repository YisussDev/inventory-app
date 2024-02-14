import {NgModule} from "@angular/core";
import {
  ProviderImplementation
} from "../../../../infrastructure/adapters/api/implementation/provider/provider.implementation";
import {ProviderUseCaseService} from "./provider-use-case.service";

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    ProviderImplementation,
    ProviderUseCaseService
  ]
})
export class ProviderUseCaseModule {
}

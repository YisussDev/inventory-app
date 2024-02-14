import {NgModule} from "@angular/core";
import {
  SaleImplementation
} from "../../../../infrastructure/adapters/api/implementation/sale/sale.implementation";
import {SaleUseCaseService} from "./sale-use-case.service";

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    SaleImplementation,
    SaleUseCaseService
  ]
})
export class SaleUseCaseModule {
}

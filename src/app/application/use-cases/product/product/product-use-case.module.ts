import {NgModule} from "@angular/core";
import {
  ProductImplementation
} from "../../../../infrastructure/adapters/api/implementation/product/product.implementation";
import {ProductUseCaseService} from "./product-use-case.service";

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    ProductImplementation,
    ProductUseCaseService
  ]
})
export class ProductUseCaseModule {
}

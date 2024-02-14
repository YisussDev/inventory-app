import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductsRoutingModule} from './products-routing.module';
import {ProductsComponent} from './products.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {HeaderModule} from "../../../../../../shared/components/layout-components/header/header.module";
import {TablesModule} from "../../../../../../shared/components/tables/tables.module";
import {ProductUseCaseModule} from "../../../../../../application/use-cases/product/product/product-use-case.module";
import {
  ProviderUseCaseModule
} from "../../../../../../application/use-cases/provider/provider/provider-use-case.module";


@NgModule({
  declarations: [
    ProductsComponent,
    ProductListComponent
  ],
  imports: [
    ProductUseCaseModule,
    ProviderUseCaseModule,
    CommonModule,
    ProductsRoutingModule,
    HeaderModule,
    TablesModule
  ]
})
export class ProductsModule {
}

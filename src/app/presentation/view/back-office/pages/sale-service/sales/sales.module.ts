import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SalesRoutingModule} from './sales-routing.module';
import {SalesComponent} from './sales.component';
import {SalesListComponent} from './components/sales-list/sales-list.component';
import {HeaderModule} from "../../../../../../shared/components/layout-components/header/header.module";
import {TablesModule} from "../../../../../../shared/components/tables/tables.module";
import {SaleUseCaseModule} from "../../../../../../application/use-cases/sale/sale/sale-use-case.module";
import {SalesCreateComponent} from './components/sales-create/sales-create.component';
import {InputsModule} from "../../../../../../shared/components/inputs/inputs.module";
import {ButtonsModule} from "../../../../../../shared/components/buttons/buttons.module";
import {ProductUseCaseModule} from "../../../../../../application/use-cases/product/product/product-use-case.module";
import {ReactiveFormsModule} from "@angular/forms";
import { SalesDetailComponent } from './components/sales-detail/sales-detail.component';


@NgModule({
  declarations: [
    SalesComponent,
    SalesListComponent,
    SalesCreateComponent,
    SalesDetailComponent
  ],
  imports: [
    ProductUseCaseModule,
    SaleUseCaseModule,
    CommonModule,
    SalesRoutingModule,
    HeaderModule,
    TablesModule,
    InputsModule,
    ButtonsModule,
    ReactiveFormsModule
  ]
})
export class SalesModule {
}

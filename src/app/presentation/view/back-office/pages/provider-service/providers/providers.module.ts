import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProvidersRoutingModule} from './providers-routing.module';
import {ProvidersComponent} from './providers.component';
import {HeaderModule} from "../../../../../../shared/components/layout-components/header/header.module";
import {ProviderListComponent} from './components/provider-list/provider-list.component';
import {TablesModule} from "../../../../../../shared/components/tables/tables.module";
import {
  ProviderUseCaseModule
} from "../../../../../../application/use-cases/provider/provider/provider-use-case.module";


@NgModule({
  declarations: [
    ProvidersComponent,
    ProviderListComponent
  ],
  imports: [
    ProviderUseCaseModule,
    CommonModule,
    ProvidersRoutingModule,
    HeaderModule,
    TablesModule
  ]
})
export class ProvidersModule {
}

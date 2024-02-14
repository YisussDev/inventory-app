import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuditsRoutingModule} from './audits-routing.module';
import {AuditsComponent} from './audits.component';
import {AuditListComponent} from './components/audit-list/audit-list.component';
import {TablesModule} from "../../../../../../shared/components/tables/tables.module";
import {AuditUseCaseModule} from "../../../../../../application/use-cases/audit/audit/audit-use-case.module";
import {HeaderModule} from "../../../../../../shared/components/layout-components/header/header.module";


@NgModule({
  declarations: [
    AuditsComponent,
    AuditListComponent
  ],
  imports: [
    AuditUseCaseModule,
    CommonModule,
    AuditsRoutingModule,
    TablesModule,
    HeaderModule
  ]
})
export class AuditsModule {
}

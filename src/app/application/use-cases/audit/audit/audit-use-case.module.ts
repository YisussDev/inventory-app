import {NgModule} from "@angular/core";
import {
  AuditImplementation
} from "../../../../infrastructure/adapters/api/implementation/audit/audit.implementation";
import {AuditUseCaseService} from "./audit-use-case.service";

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    AuditImplementation,
    AuditUseCaseService
  ]
})
export class AuditUseCaseModule {
}

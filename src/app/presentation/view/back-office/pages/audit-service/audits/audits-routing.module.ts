import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuditListComponent} from "./components/audit-list/audit-list.component";

const routes: Routes = [
  {
    path: 'list',
    component: AuditListComponent
  },
  {
    path: '**', redirectTo: 'list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditsRoutingModule {
}

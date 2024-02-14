import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuditsComponent} from "./audits/audits.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./audits/audits.module').then(m => m.AuditsModule),
    component: AuditsComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditServiceRoutingModule {
}

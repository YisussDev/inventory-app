import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SalesComponent} from "./sales/sales.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule),
    component: SalesComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleServiceRoutingModule {
}

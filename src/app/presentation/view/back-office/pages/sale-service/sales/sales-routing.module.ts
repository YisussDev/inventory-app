import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SalesListComponent} from "./components/sales-list/sales-list.component";
import {SalesCreateComponent} from "./components/sales-create/sales-create.component";
import {SalesDetailComponent} from "./components/sales-detail/sales-detail.component";

const routes: Routes = [
  {
    path: 'list',
    component: SalesListComponent,
    data: {
      title: "Ventas",
      breadcrumbs: ["Inicio", "Ventas"]
    }
  },
  {
    path: 'create',
    component: SalesCreateComponent,
    data: {
      title: "Ventas",
      breadcrumbs: ["Inicio", "Ventas"]
    }
  },
  {
    path: 'detail/:id',
    component: SalesDetailComponent,
    data: {
      title: "Ventas",
      breadcrumbs: ["Inicio", "Ventas"]
    }
  },
  {
    path: '**', redirectTo: 'list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {
}

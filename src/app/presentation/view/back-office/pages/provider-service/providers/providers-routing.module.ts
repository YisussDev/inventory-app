import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProviderListComponent} from "./components/provider-list/provider-list.component";

const routes: Routes = [
  {
    path: 'list',
    component: ProviderListComponent,
    data: {
      title: "Proveedores",
      breadcrumbs: ["Inicio", "Proveedores"]
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
export class ProvidersRoutingModule {
}

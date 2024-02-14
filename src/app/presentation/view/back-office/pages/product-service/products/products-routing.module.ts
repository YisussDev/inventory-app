import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from "./components/product-list/product-list.component";

const routes: Routes = [
  {
    path: 'list',
    component: ProductListComponent,
    data: {
      title: "Productos",
      breadcrumbs: ["Inicio", "Productos"]
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
export class ProductsRoutingModule {
}

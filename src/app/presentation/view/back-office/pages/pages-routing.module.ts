import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppServiceComponent} from "./app-service/app-service.component";
import {UserServiceComponent} from "./user-service/user-service.component";
import {ProductServiceComponent} from "./product-service/product-service.component";
import {ProviderServiceComponent} from "./provider-service/provider-service.component";

const routes: Routes = [
  {
    path: 'apps',
    loadChildren: () => import('./app-service/app-service.module').then(m => m.AppServiceModule),
    component: AppServiceComponent
  },
  {
    path: 'users',
    loadChildren: () => import('./user-service/user-service.module').then(m => m.UserServiceModule),
    component: UserServiceComponent
  },
  {
    path: 'products',
    loadChildren: () => import('./product-service/product-service.module').then(m => m.ProductServiceModule),
    component: ProductServiceComponent
  },
  {
    path: 'providers',
    loadChildren: () => import('./provider-service/provider-service.module').then(m => m.ProviderServiceModule),
    component: ProviderServiceComponent
  },
  {
    path: 'sales',
    loadChildren: () => import('./sale-service/sale-service.module').then(m => m.SaleServiceModule),
    component: ProviderServiceComponent
  },
  {
    path: 'audits',
    loadChildren: () => import('./audit-service/audit-service.module').then(m => m.AuditServiceModule),
    component: ProviderServiceComponent
  },
  {
    path: '**', redirectTo: 'apps'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginServiceComponent} from "./login-service/login-service.component";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login-service/login-service.module').then(m => m.LoginServiceModule),
    canActivate: [],
    component: LoginServiceComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}

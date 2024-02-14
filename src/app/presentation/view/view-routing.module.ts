import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {BackOfficeComponent} from "./back-office/back-office.component";
import {BackOfficeGuard} from "../../core/guards/auth/back-office.guard";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    component: AuthComponent
  },
  {
    path: 'back-office',
    loadChildren: () => import('./back-office/back-office.module').then(m => m.BackOfficeModule),
    canActivate: [BackOfficeGuard],
    data: {
      preload: true
    },
    component: BackOfficeComponent
  },
  {
    path: '**', redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule {
}

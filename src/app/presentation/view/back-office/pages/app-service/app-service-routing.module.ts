import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app/app.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./app/app.module').then(m => m.AppModule),
    component: AppComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppServiceRoutingModule {
}

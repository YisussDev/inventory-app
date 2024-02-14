import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProvidersComponent} from "./providers/providers.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./providers/providers.module').then(m => m.ProvidersModule),
    component: ProvidersComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderServiceRoutingModule {
}

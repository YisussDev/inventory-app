import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ViewComponent} from "./view/view.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./view/view.module').then(m => m.ViewModule),
    component: ViewComponent,
    data: {
      preload: true
    }
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresentationRoutingModule {
}

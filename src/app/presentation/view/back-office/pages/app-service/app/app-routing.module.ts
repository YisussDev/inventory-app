import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppListComponent} from "./components/app-list/app-list.component";

const routes: Routes = [
  {
    path: 'list',
    component: AppListComponent
  },
  {
    path: '**', redirectTo: 'list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

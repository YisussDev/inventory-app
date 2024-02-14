import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from "./components/user-list/user-list.component";

const routes: Routes = [
  {
    path: 'list',
    component: UserListComponent,
    data: {
      title: "Usuarios",
      breadcrumbs: ["Inicio", "Usuarios"]
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
export class UsersRoutingModule {
}

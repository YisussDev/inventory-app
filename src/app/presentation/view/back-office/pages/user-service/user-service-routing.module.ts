import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersModule} from "./users/users.module";
import {UsersComponent} from "./users/users.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./users/users.module').then(m => UsersModule),
    component: UsersComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserServiceRoutingModule {
}

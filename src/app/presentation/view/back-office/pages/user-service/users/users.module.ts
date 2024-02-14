import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './users.component';
import {UserListComponent} from "./components/user-list/user-list.component";
import {HeaderModule} from "../../../../../../shared/components/layout-components/header/header.module";
import {TablesModule} from "../../../../../../shared/components/tables/tables.module";
import {UserUseCaseModule} from "../../../../../../application/use-cases/user/user/user-use-case.module";


@NgModule({
  declarations: [
    UsersComponent,
    UserListComponent,
  ],
  imports: [
    UserUseCaseModule,
    CommonModule,
    UsersRoutingModule,
    HeaderModule,
    TablesModule
  ]
})
export class UsersModule {
}

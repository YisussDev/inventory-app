import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableMobileComponent} from "./table-mobile/table-mobile.component";
import {ItemTableMobileComponent} from "./table-mobile/components/item-table-mobile/item-table-mobile.component";
import {ButtonsModule} from "../buttons/buttons.module";



@NgModule({
  declarations: [
    TableComponent,
    PaginationComponent,
    TableMobileComponent,
    ItemTableMobileComponent
  ],
  exports:[
    TableComponent,
    PaginationComponent,
    TableMobileComponent,
    ItemTableMobileComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ButtonsModule
    ]
})
export class TablesModule { }

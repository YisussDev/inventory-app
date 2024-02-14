import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewOptionComponent} from "./defaults/components/view-option/view-option.component";
import {FormSimpleComponent} from "./defaults/form-simple/form-simple.component";
import {ListMultipleOptionComponent} from "./defaults/list-multiple-option/list-multiple-option.component";
import {ListUniqueOptionComponent} from "./defaults/list-unique-option/list-unique-option.component";
import {ModalComponent} from "./modal.component";
import {ButtonsModule} from "../buttons/buttons.module";
import {InputsModule} from "../inputs/inputs.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormStreamingComponent} from "./defaults/form-streaming/form-streaming.component";
import {ShowDocumentComponent} from "./defaults/show-document/show-document.component";
import {PdfViewerModule} from "ng2-pdf-viewer";


@NgModule({
  declarations: [
    ModalComponent,
    ListUniqueOptionComponent,
    ListMultipleOptionComponent,
    FormSimpleComponent,
    FormStreamingComponent,
    ListUniqueOptionComponent,
    ListMultipleOptionComponent,
    ViewOptionComponent,
    ShowDocumentComponent
  ],
  exports: [
    ModalComponent,
    ListUniqueOptionComponent,
    ListMultipleOptionComponent,
    FormSimpleComponent,
    ViewOptionComponent,
    ShowDocumentComponent
  ],
  imports: [
    CommonModule,
    ButtonsModule,
    InputsModule,
    ReactiveFormsModule,
    FormsModule,
    PdfViewerModule
  ],
  providers: [
  ]
})
export class ModalModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputTextComponent} from "./input-text/input-text.component";
import {InputNumberComponent} from "./input-number/input-number.component";
import {InputAutocompleteComponent} from "./input-autocomplete/input-autocomplete.component";
import {InputCheckBoxComponent} from "./input-check-box/input-check-box.component";
import {InputDateComponent} from "./input-date/input-date.component";
import {InputSelectComponent} from "./input-select/input-select.component";
import {InputMultipleOptionsComponent} from "./input-multiple-options/input-multiple-options.component";
import {InputEmailComponent} from "./input-email/input-email.component";
import {InputPasswordComponent} from "./input-password/input-password.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ErrorsInput} from "./helpers/errors-input";
import {ErrorsHelper} from "./helpers/helper";
import {InputToggleComponent} from './input-toggle/input-toggle.component';
import {InputFileComponent} from "./input-file/input-file.component";


@NgModule({
  declarations: [
    InputTextComponent,
    InputNumberComponent,
    InputAutocompleteComponent,
    InputCheckBoxComponent,
    InputDateComponent,
    InputSelectComponent,
    InputMultipleOptionsComponent,
    InputEmailComponent,
    InputPasswordComponent,
    InputToggleComponent,
    InputFileComponent
  ],
  exports: [
    InputTextComponent,
    InputNumberComponent,
    InputAutocompleteComponent,
    InputCheckBoxComponent,
    InputDateComponent,
    InputSelectComponent,
    InputMultipleOptionsComponent,
    InputEmailComponent,
    InputPasswordComponent,
    InputToggleComponent,
    InputFileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ErrorsInput,
    ErrorsHelper,
  ]
})
export class InputsModule {
}

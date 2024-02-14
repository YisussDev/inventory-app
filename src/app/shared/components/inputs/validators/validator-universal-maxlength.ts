import {AbstractControl, ValidatorFn} from "@angular/forms";

export function validatorUniversalMaxlength(valueCondition: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {

    if(!control.value) return null;
    if ((control.value.toString().trim().length > valueCondition)) {
      return { 'validatorUniversalMaxlength': valueCondition };
    }

    return null;
  };
}

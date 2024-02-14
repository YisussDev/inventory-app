import {AbstractControl, ValidatorFn} from "@angular/forms";

export function validatorEqual(valueCondition: any): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if(!control.value) return null;
    if (!(control.value == valueCondition)) {
      return { 'validatorNotEqual': valueCondition };
    }

    return null;
  };
}

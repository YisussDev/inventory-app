import { ValidatorFn, AbstractControl } from "@angular/forms";

export function validatorUniversalMinlength(valueCondition: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {

    if(!control.value) return null;
    if ((control.value.toString().trim().length < valueCondition)) {
      return { 'validatorUniversalMinlength': valueCondition };
    }

    return null;
  };
}

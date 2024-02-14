import {AbstractControl, ValidatorFn} from "@angular/forms";

export function validatorPassword(control: AbstractControl): { [key: string]: boolean } | null {

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,*@#$%^&+=!¡¿?\/])[A-Za-z\d.,*@#$%^&+=!¡¿?\/]+$/gm;

  if (!regex.test(control.value)) {
    return { 'validatorPassword': true };
  }

  return null;
}

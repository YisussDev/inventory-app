import {AbstractControl} from "@angular/forms";

export function validatorEmail(control: AbstractControl): { [key: string]: boolean } | null {
  const regex = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*|(('.+'))))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regex.test(control.value)) {
    return { 'validatorEmail': true };
  }

  return null;
}

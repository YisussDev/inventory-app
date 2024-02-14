import {AbstractControl, ValidatorFn} from "@angular/forms";
// @ts-ignore
import moment from 'moment';

export function validatorDate(yearsRange: number, operationRange: string = 'years'): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {

    const yearActual = new Date(control.value);
    let calc:any = '';
    if(operationRange == 'years'){
      calc = moment().subtract(yearsRange, 'years');
    }
    else if(operationRange == 'days'){
      calc = moment().subtract(yearsRange, 'days');
    }
    const yearIsBefore = moment(yearActual).isBefore(calc);

    if (yearIsBefore) {
      return null; // la fecha está dentro del rango
    }

    return {'validatorDate': true};
  }
}

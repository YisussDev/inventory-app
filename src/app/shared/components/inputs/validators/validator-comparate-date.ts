import {AbstractControl, FormGroup, ValidatorFn} from "@angular/forms";
import * as moment from 'moment';

export function validatorComparateDate(yearToCompare: any, yearsRange: number, operationRange: string = 'years'): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {

    let yearControl = moment(control.value);
    let yearInitial = moment(yearToCompare);
    let calc: any = '';
    calc = yearInitial.add(yearsRange, 'years');

    if (moment(yearControl).isBefore(calc) || moment().isBefore(yearControl)) {
      return {'validatorComparateDate': true};
    } else {
      return null;
    }
  }
}

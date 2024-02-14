import {AbstractControl} from "@angular/forms";
import {Injectable} from "@angular/core";
import {dictionariesErrors} from "./dictionaries-errors";

@Injectable({
  providedIn: 'root'
})
export class ErrorsInput {

  private dictionariesErrors: any = dictionariesErrors;
  calculateErrors(control: AbstractControl | null): any {

    if (control && control.errors) {
      const errorActual = Object.keys(control.errors)[0];
      if(errorActual == 'min'){
        return `${this.dictionariesErrors[errorActual].message} ${this.dictionariesErrors[errorActual].expressable ? control.errors[errorActual][errorActual] : ''}`;
      }
      return `${this.dictionariesErrors[errorActual].message} ${this.dictionariesErrors[errorActual].expressable ? control.errors[errorActual] : ''}`;
    }
    return '';
  }
}

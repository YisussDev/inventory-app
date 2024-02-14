import {EventEmitter} from "@angular/core";
import {AbstractControl} from "@angular/forms";

export interface InputProperties {

  control?: AbstractControl | null;
  label: string;
  placeholder: string | null;
  delayActive: boolean | null;
  delayTime: number | null;

  $customLogicInput: EventEmitter<any>;

  useDelay?(): void;

  changeValue(event: any): void;

}

export interface ConfigAutocompleteInterface {
  keyToChangeControl: string;
  labelToShowFirstControl: string;
  keyToShowFirstControl: string;
  pipeFirsControl?: any;
  labelToShowSecondControl?: string;
  keyToShowSecondControl?: string;
  pipeSecondControl?: any;
  labelToShowThirdControl?: string;
  keyToShowThirdControl?: string;
  pipeThirdControl?: any;
}

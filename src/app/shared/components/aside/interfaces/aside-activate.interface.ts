import {FormGroup} from "@angular/forms";
import {FieldFormInterface} from "../../../../core/interfaces/forms/field-form.interface";
import {ConfigLabelsInterface} from "../../modal/interfaces/config-labels.interface";

export interface AsideActivateInterface {
  component: any;
  title: string;
  event: string;
  formGroup?: FormGroup;
  configForm?: FieldFormInterface[];
  dataList?: any[] | string;
  dataGeneric?: any[];
  configLabels?: ConfigLabelsInterface;
}

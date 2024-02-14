import {Component, ComponentRef} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {ConfigLabelsInterface} from "./config-labels.interface";
import {FieldFormInterface} from "../../../../core/interfaces/forms/field-form.interface";

export interface ModalActivateInterface {
  component: any;
  title: string;
  event: string;
  formGroup?: FormGroup;
  configForm?: FieldFormInterface[];
  dataList?: any[] | string;
  dataGeneric?: any[];
  configLabels?: ConfigLabelsInterface;
  dataAux?: any;
}

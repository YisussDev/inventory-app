import {Component, ComponentRef, Injectable, Output} from '@angular/core';
import { Subject} from "rxjs";
import {ModalActivateInterface} from "../interfaces/modal-activate.interface";
import {FormGroup} from "@angular/forms";
import {ConfigLabelsInterface} from "../interfaces/config-labels.interface";
import {FieldFormInterface} from "@core-interfaces/forms/field-form.interface";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  @Output() finishModal: Subject<any> = new Subject<any>();
  @Output() startModal: Subject<ModalActivateInterface> = new Subject<ModalActivateInterface>();
  @Output() streamingModalChanges: Subject<any> = new Subject<any>();
  constructor() { }


  openModal(component: any, title:string, event:string, formGroup?: FormGroup, configForm?: FieldFormInterface[], dataList?: any | string, dataGeneric?: any, configLabels?: ConfigLabelsInterface, dataAux?: any): void {
    this.startModal.next({component, title, event, formGroup, configForm, dataList, dataGeneric, configLabels, dataAux});
  }

  closeModal(data?: any): void {
    this.finishModal.next(data);
  }



}

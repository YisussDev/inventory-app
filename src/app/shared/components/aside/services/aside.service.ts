import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {FormGroup} from "@angular/forms";
import {FieldFormInterface} from "../../../../core/interfaces/forms/field-form.interface";
import {ConfigLabelsInterface} from "../../modal/interfaces/config-labels.interface";
import {AsideActivateInterface} from "../interfaces/aside-activate.interface";

@Injectable({
  providedIn: 'root'
})
export class AsideService {

  public openAside: Subject<AsideActivateInterface> = new Subject<AsideActivateInterface>();
  public closeAside: Subject<any> = new Subject<any>();
  public streamAside: Subject<any> = new Subject<any>();

  constructor() {
  }

  openAsideComponent(component: any, title: string, event: string, formGroup?: FormGroup, configForm?: FieldFormInterface[], dataList?: any | string, dataGeneric?: any, configLabels?: ConfigLabelsInterface): void {
    this.openAside.next({component, title, event, formGroup, configForm, dataList, dataGeneric, configLabels});
  }

  closeAsideComponent(data?: any): void {
    this.closeAside.next(data);
  }

  public open(): void {
    // this.openAside.next(true);
  }

  public close(): void {
    this.closeAside.next(false);
  }

}

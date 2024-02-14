import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ModalService} from "../../services/modal.service";
import {debounceTime, Subscription} from "rxjs";
import {FieldFormInterface} from "../../../../../core/interfaces/forms/field-form.interface";

@Component({
  selector: 'app-form-streaming',
  templateUrl: './form-streaming.component.html',
  styleUrls: ['./form-streaming.component.css']
})
export class FormStreamingComponent implements OnInit, OnDestroy {
  public formGeneral!: FormGroup;
  public configForm!: FieldFormInterface[];
  public data!: any;
  public eventName!: string;
  public dataGeneric!: string;

  private listenFormChanges$!: Subscription;

  constructor(
    private modalService: ModalService
  ) {
  }

  ngOnInit() {
    this.initStreamModal();
  }

  initStreamModal(): void {
    this.listenFormChanges$ = this.formGeneral.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(dataform => this.modalService.streamingModalChanges.next({data: dataform, eventName: this.eventName, dataGeneric: this.dataGeneric}));
  }

  terminateForm(): void {
    if (!this.formGeneral.valid) {
      this.formGeneral.markAllAsTouched();
    } else {
      this.modalService.closeModal({
        data: this.formGeneral.value,
        eventName: this.eventName,
        dataGeneric: this.dataGeneric
      })
    }
  }

  closeModal(): void {
    this.modalService.closeModal();
  }

  ngOnDestroy() {
    this.listenFormChanges$.unsubscribe();
  }

}

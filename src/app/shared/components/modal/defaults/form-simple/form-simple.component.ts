import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";
import Swal from "sweetalert2";
import {ModalService} from "../../services/modal.service";
import {FieldFormInterface} from "../../../../../core/interfaces/forms/field-form.interface";

@Component({
  selector: 'app-form-simple',
  templateUrl: './form-simple.component.html',
  styleUrls: ['./form-simple.component.css']
})
export class FormSimpleComponent {
  public formGeneral!: FormGroup;
  public configForm!: FieldFormInterface[];
  public data!: any;
  public eventName!: string;
  public dataGeneric!: string;

  constructor(
    private modalService: ModalService
  ) {
  }


  terminateForm(): void {
    if (!this.formGeneral.valid) {
      this.formGeneral.markAllAsTouched();
    } else {
      this.modalService.closeModal({data: this.formGeneral.value, eventName: this.eventName, dataGeneric: this.dataGeneric})
    }
  }

  closeModal(): void {
    this.modalService.closeModal();
  }
}

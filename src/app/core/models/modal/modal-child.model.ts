import { FormGroup } from "@angular/forms";
import { FieldFormInterface } from "@core-interfaces/forms/field-form.interface";
import { ModalService } from "src/app/shared/components/modal/services/modal.service";

export class ModalChildModel {

    public formGeneral!: FormGroup;
    public configForm!: FieldFormInterface[];
    public data!: any;
    public eventName!: string;
    public dataGeneric!: any;
    public dataAux!: any;

    constructor(
        public _modalService: ModalService
    ) {
    }

    public cancelModal(): void {
        this._modalService.closeModal();
    }

}
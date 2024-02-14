import {FormGroup} from "@angular/forms";
import {FieldFormInterface} from "../forms/field-form.interface";
import {FileInterface} from "../files/file.interface";
import {Signs} from "@signature-entities/signs/signs.entity";
import {Items} from "@signature-entities/items/items.entity";

export class DocumentsPdf {
  constructor(
    public id: string,
    public src: any,
    public reference: string,
    public filename: string,
    public type: 'url' | 'base64',
    public signs: Signs[],
    public items: Items[],
    public page_actual: number,
    public total_pages: number | 1,
    public pages_index: string[] | [],
    public form: FormGroup,
    public configForm: FieldFormInterface[],
    public extraAttachments?: FileInterface[],
    public extraReceptors?: any[]
  ) {
  }

}

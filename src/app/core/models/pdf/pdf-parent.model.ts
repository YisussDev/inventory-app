import {Attachments, DocumentSignerEntity} from "@signature-entities/document-signers/document-signer.entity";
import {DocumentsPdf} from "@core-interfaces/pdf/documentspdf.interface";
import {Signers} from "@signature-entities/signers/signers.entity";
import {ItemsConfig} from "../../../infrastructure/signature/config/items/items.config";
import {SignsConfig} from "../../../infrastructure/signature/config/signs/signs.config";
import {Receptors} from "@signature-entities/receptors/receptor.entity";
import {debounceTime, Subscription} from "rxjs";
import {DocumentsUseCaseService} from "@signature-use-cases/documents/documents-use-case.service";
import {ItemsUseCaseService} from "@signature-use-cases/items/items-use-case.service";
import {Items} from "@signature-entities/items/items.entity";


export class PdfParentModel {

  public containerPdf!: any;

  public document!: DocumentSignerEntity;
  public documents: DocumentsPdf[] = [];
  public documentSelected: number = 0;
  public optionSelected: number = 0;

  public baseWidth: number = 612;
  public baseHeight: number = 792;

  public dictionarieZoom: any = {
    0.5: '50%',
    1: '100%',
    1.5: '150%'
  }

  private widthChange: number = 1100;

  public scale!: number;

  public signers: Signers[] = [];

  public configTypeItems: any = ItemsConfig;
  public configTypeSigns: any = SignsConfig;

  public listenerForms$: any = {};
  public listenResizeWindow$!: Subscription;

  constructor(
    private _documentUseCaseService: DocumentsUseCaseService,
    private _itemsUseCaseService: ItemsUseCaseService
  ) {
  }

  public changePage(page: number): void {
    this.documents[this.documentSelected].page_actual = page;
  }

  public afterDocument(): void {
    if ((this.documentSelected == (this.documents.length - 1))) return;
    this.documents.map(res => res.page_actual = 1);
    this.documentSelected += 1;
  }

  public beforeDocument(): void {
    if (!(this.documentSelected > 0)) return;
    this.documents.map(res => res.page_actual = 1);
    this.documentSelected -= 1;
  }

  public afterLoadPdf(event: any): void {
    this.documents[this.documentSelected].total_pages = event._transport._numPages;
    this.documents[this.documentSelected].pages_index = event._transport.pageCache;
  }

  public initContainer(): void {
    if (window.innerWidth >= this.widthChange) {
      this.scale = 1;
    } else if (window.innerWidth < this.widthChange) {
      this.scale = 0.5;
      this.updateScaleUpToDown();
    }
    // this.listenResizeWindow$ = fromEvent(window, 'resize').subscribe((event: any) => {
    //   // if (event.target.innerWidth < this.widthChange) {
    //   //   if (this.scale == 0.5) return;
    //   //   this.scale = 0.5;
    //   //   this.zoomMinus();
    //   // } else if (event.target.innerWidth >= this.widthChange) {
    //   //   if (this.scale == 1) return;
    //   //   this.scale = 1;
    //   //   this.zoomPlus();
    //   // }
    // });
  }

  protected updateScaleUpToDown(): void {
    this.documents = this._documentUseCaseService.scaleUpToDown(this.documents, 0.5);
  }

  protected updateScaleDownToUp(): void {
    this.documents = this._documentUseCaseService.scaleDownToUp(this.documents, 0.5);
  }

  protected scaleDocumentsDown(): void {
    this.documents = this._documentUseCaseService.scaleDocumentsDown(this.documents, this.scale);
  }

  protected scaleDocumentsUp(): void {
    this.documents = this._documentUseCaseService.scaleDocumentsUp(this.documents, this.scale);
  }

  public prevPage(): void {
    if (this.documents[this.documentSelected].page_actual == 1) return;
    this.documents[this.documentSelected].page_actual -= 1;
  }

  public nextPage(): void {
    if (this.documents[this.documentSelected].total_pages == this.documents[this.documentSelected].page_actual) return;
    this.documents[this.documentSelected].page_actual += 1;
  }

  public validateDocumentsSignatures(): boolean {
    if (!this.document) return false;
    let isValid = true;
    for (let messages of this.document.messages) {
      if (messages.signatures.length == 0) {
        return false;
      } else {
        for (let sign of messages.signatures) {
          if (!sign.signerKey) return false;
        }
      }
    }
    return isValid;
  }

  public changeOptionSelected(option: number): void {
    this.optionSelected = option;
  }

  public initListenerForms(): void {
    for (let ind in this.documents) {
      this.listenerForms$[`listener${ind}`] = this.documents[ind].form.valueChanges.pipe(debounceTime(200)).subscribe(data => {
        this.documents[ind].items = this._itemsUseCaseService.assignValuesToItems(this.documents[ind].items, this.documents[ind].form);
      })
    }
  }

  public destroyListenerForms(): void {
    const keys = Object.keys(this.listenerForms$);
    for (let key of keys) {
      this.listenerForms$[key].unsubscribe();
    }
  }

  public checkSignerKeys(): void {
    for (let document of this.documents) {
      for (let sign of document.signs) {
        let existSigner = false;
        for (let signer of this.signers) {
          if (sign.signerKey == signer.key) (existSigner = true);
        }
        if (!existSigner) (sign.signerKey = null);
      }
    }
  }

  public updateFormByEventEditItem(id_item: string, value: string): void {
    this.documents[this.documentSelected].form.controls[id_item.replace(/-/g, '')].setValue(value);
  }

  public validateSignerHasSign(signer_key: string): boolean {
    let hasSign: boolean = false;
    for (let document of this.documents) {
      for (let sign of document.signs) {
        if (signer_key == sign.signerKey) (hasSign = true);
      }
    }
    return hasSign;
  }

  public updateZoomContainer(scale: number): void {
    if (this.containerPdf) {
      this.containerPdf.style.width = (this.baseWidth * scale) + "px";
      this.containerPdf.style.minWidth = (this.baseWidth * scale) + "px";
      this.containerPdf.style.maxWidth = (this.baseWidth * scale) + "px";
      this.containerPdf.style.height = (this.baseHeight * scale) + "px";
      this.containerPdf.style.minHeight = (this.baseHeight * scale) + "px";
      this.containerPdf.style.maxHeight = (this.baseHeight * scale) + "px";
    }
  }

  public zoomPlus(): void {
    this.containerPdf = document.getElementById('container-pdf');
    if (this.scale == 1.5) return;
    this.scale = this.scale + 0.5;
    if (this.containerPdf) this.updateZoomContainer(this.scale);
    // this.updateScaleDownToUp();
    this.scaleDocumentsUp();
  }

  public zoomMinus(): void {
    this.containerPdf = document.getElementById('container-pdf');
    if (this.scale == 0.5) return;
    this.scale = this.scale - 0.5;
    if (this.containerPdf) this.updateZoomContainer(this.scale);
    // this.updateScaleUpToDown();
    this.scaleDocumentsDown();
  }

  public deletedItem(item: Items): void {
    this.documents[this.documentSelected].configForm = this.documents[this.documentSelected].configForm.filter(res => res.formControlName != item.id.replace(/-/g, ''));
    this.documents[this.documentSelected].form.removeControl(item.id.replace(/-/g, ''));
  }


}

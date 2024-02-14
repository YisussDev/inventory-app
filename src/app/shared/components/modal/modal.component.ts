import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Subscription} from "rxjs";
import {ModalService} from "./services/modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

  @ViewChild('modalContainer', {read: ViewContainerRef}) containerModal!: ViewContainerRef;
  public componentInstance!: ComponentRef<any> | null;

  public isOpen: boolean = false;
  public title: string = '';
  public listenOpen$!: Subscription;
  public listenClose$!: Subscription;

  constructor(
    private modalService: ModalService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
  }

  ngOnInit() {
    this.listenEvents();
  }

  listenEvents(): void {
    this.listenOpen$ = this.modalService.startModal.subscribe(data => {
      this.ngZone.run(() => {
        this.title = data.title;
        this.isOpen = true;
        this.cdr.detectChanges();
        this.componentInstance = this.containerModal.createComponent(data.component);
        this.componentInstance.instance.data = data.dataList;
        this.componentInstance.instance.dataGeneric = data.dataGeneric;
        this.componentInstance.instance.formGeneral = data.formGroup;
        this.componentInstance.instance.configForm = data.configForm;
        this.componentInstance.instance.eventName = data.event;
        this.componentInstance.instance.configLabels = data.configLabels;
        this.componentInstance.instance.dataAux = data.dataAux;
      });
    })
    this.listenClose$ = this.modalService.finishModal.subscribe(data => {
      this.isOpen = false;
    })
  }

  ngOnDestroy() {
    this.listenOpen$.unsubscribe();
    this.listenClose$.unsubscribe();
  }

  closeModal(): void {
    if (this.componentInstance) {
      this.componentInstance.destroy();
      this.componentInstance = null;
    }
    this.isOpen = false;
    this.cdr.detectChanges();
  }
}

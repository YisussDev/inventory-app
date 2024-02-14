import {ChangeDetectorRef, Component, ComponentRef, NgZone, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {fromEvent, Subscription} from "rxjs";
import {AsideService} from "../../services/aside.service";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  @ViewChild('asideContainer', {read: ViewContainerRef}) containerModal!: ViewContainerRef;
  public componentInstance!: ComponentRef<any> | null;

  public visible: boolean = false;
  public title: string = '';
  public closing: boolean = false;
  public listenOpen$!: Subscription;
  public listenClose$!: Subscription;
  public listenStream$!: Subscription;

  constructor(
    private asideService: AsideService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    // this.initListenOpenClose();
    this.listenEvents();
  }

  listenEvents(): void {
    this.listenOpen$ = this.asideService.openAside.subscribe(data => {
      this.ngZone.run(() => {
        this.title = data.title;
        this.visible = true;
        this.cdr.detectChanges();
        this.componentInstance = this.containerModal.createComponent(data.component);
        this.componentInstance.instance.data = data.dataList;
        this.componentInstance.instance.dataGeneric = data.dataGeneric;
        this.componentInstance.instance.formGeneral = data.formGroup;
        this.componentInstance.instance.configForm = data.configForm;
        this.componentInstance.instance.eventName = data.event;
        this.componentInstance.instance.configLabels = data.configLabels;
      });
    })
    this.listenClose$ = this.asideService.closeAside.subscribe(data => {
      this.closing = true;
      setTimeout(() => {
        this.visible = false;
        this.closing = false;
      }, 300)
    })
  }

  public closeAside(): void {
    this.asideService.closeAsideComponent();
  }

}

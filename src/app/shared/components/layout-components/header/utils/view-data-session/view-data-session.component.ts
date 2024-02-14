import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FieldFormInterface} from "../../../../../../core/interfaces/forms/field-form.interface";
import {ModalService} from "../../../../modal/services/modal.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {ThemeService} from "@core-services/theme/theme.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-view-data-session',
  templateUrl: './view-data-session.component.html',
  styleUrls: ['./view-data-session.component.css']
})
export class ViewDataSessionComponent implements OnInit, OnDestroy {
  public formGeneral!: FormGroup;
  public configForm!: FieldFormInterface[];
  public data!: any;
  public eventName!: string;
  public dataGeneric!: string;

  public themeActive: boolean = false;
  private listenTheme$!: Subscription;

  constructor(
    private themeService: ThemeService,
    private modalService: ModalService,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.initThemeEvents();
  }

  public changeTheme(status: 0 | 1): void {
    this.themeService.changeTheme();
  }

  private initThemeEvents(): void {
    this.themeActive = this.themeService.getStatus();
    this.listenTheme$ = this.themeService.changeTheme$.subscribe(status => this.themeActive = status);
  }

  private terminateForm(): void {
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

  private closeModal(): void {
    this.modalService.closeModal();
  }

  public closeSession(): void {
    Swal.fire({
      icon: 'question',
      title: 'Confirmación',
      text: '¿Desea cerrar sesión?',
      confirmButtonText: 'Sí',
      showCancelButton: true,
      cancelButtonText: 'No',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        localStorage.removeItem('data-account');
        localStorage.removeItem('x-config');
        localStorage.removeItem('x-token');
        this._router.navigateByUrl('/login', {replaceUrl: false, onSameUrlNavigation: "reload"})
      } else {

      }
    })
  }

  ngOnDestroy() {
    this.listenTheme$.unsubscribe();
  }

}

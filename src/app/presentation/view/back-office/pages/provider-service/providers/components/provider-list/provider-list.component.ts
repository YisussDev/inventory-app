import {Component, OnDestroy, OnInit} from '@angular/core';
import {TableParentModel} from "@core-models/tables/table-parent.models";
import {Subscription} from "rxjs";
import {ModalService} from "../../../../../../../../shared/components/modal/services/modal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  FormSimpleComponent
} from "../../../../../../../../shared/components/modal/defaults/form-simple/form-simple.component";
import Swal from "sweetalert2";
import {UUID} from "angular2-uuid";
import {TableParentInterface} from "@core-interfaces/tables/table-parent.interface";
import {
  ProviderUseCaseService
} from "../../../../../../../../application/use-cases/provider/provider/provider-use-case.service";
import {FieldFormInterface} from "@core-interfaces/forms/field-form.interface";
import {FilterInterface} from "@core-interfaces/filter/filter.interface";
import {ProviderEntity} from "../../../../../../../../domain/entities/provider/provider.entity";

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent extends TableParentModel implements OnInit, OnDestroy, TableParentInterface {

  public title: string = 'Providers';
  private listenModalEvents$!: Subscription;

  constructor(
    private modalService: ModalService,
    private routeActivated: ActivatedRoute,
    private router: Router,
    private providerUseCaseService: ProviderUseCaseService,
    private _formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.initTableConfig();
    this.initListenQueryParams();
    this.initTableFieldsActions();
    this.initListenModalEvents();
  }

  public initTableFieldsActions(): void {
    this.tableFieldActions = [
      {
        nameEvent: 'UPDATE',
        label: 'Actualizar'
      },
      {
        nameEvent: 'DETAIL',
        label: 'Detalles'
      },
      {
        nameEvent: 'DELETE',
        label: 'Eliminar'
      }
    ];
  }

  public initDataTable(page: number, queries?: string[][]): void {
    const filter: FilterInterface = {
      paginate: 10
    }
    if (queries) filter['orSingleQueries'] = queries;
    this.providerUseCaseService.getAll(filter, page).subscribe({
      next: (res) => {
        this.dataTable = res.data;
        this.pagination = {...res.links, ...res.meta};
      },
      error: (err) => {

      }
    });
  }

  public initTableConfig(): void {
    this.principalActions = [
      {
        nameEvent: 'CREATE',
        label: 'Crear',
        icon: 'plus'
      }
    ];
    this.quicklyActions = [
      {
        icon: 'pen',
        nameEvent: 'UPDATE',
        label: 'Actualizar'
      },
      {
        icon: 'trash',
        nameEvent: 'DELETE',
        label: 'Eliminar'
      },
    ];
    this.tableConfig = [
      {
        column_name: '_id',
        isActive: true,
        column_translate: 'ID',
        column_pipe: 'normal',
        column_type: {type: 'text'},
        active_search: true
      },
      {
        column_name: 'name',
        isActive: true,
        column_translate: 'Nombre',
        column_pipe: 'normal',
        column_type: {type: 'text'},
        active_search: true
      },
      {
        column_name: 'code',
        isActive: true,
        column_translate: 'Código',
        column_pipe: 'normal',
        column_type: {type: 'text'},
        active_search: true
      },
    ];
  }

  public initListenQueryParams(): void {
    this.routeActivated.queryParams.subscribe({
      next: (params) => {
        const queries = this.buildQueriesToFilter(params, this.tableConfig);
        this.initDataTable(params['page'], queries);
      }
    });
  }

  public listenEventFields(event: { nameEvent: string; data: ProviderEntity }): void {
    switch (event.nameEvent) {
      case ('UPDATE'):
        this.eventUpdate(event.data);
        break;
      case ('DETAIL'):
        // this.eventDetail(event.data);
        break;
      case ('DELETE'):
        this.eventDelete(event.data);
        break;
      case ('CREATE'):
        this.eventCreate();
        break;
    }
  }

  public eventUpdate(data: ProviderEntity): void {
    const form: FormGroup = this._formBuilder.group({
      _id: [""],
      name: ["", Validators.required],
      code: ["", Validators.required],
    });
    const configForm: FieldFormInterface[] = [
      {
        label: 'Nombre',
        data: null,
        placeholder: '',
        icon: 'pen',
        customLogicActive: null,
        delayActive: null,
        delayTime: null,
        formControlName: 'name',
        keyToChangeControl: null,
        keyToShowControl: null,
        nameCustomLogic: null,
        typeField: 'TEXT'
      },
      {
        label: 'Código',
        data: null,
        placeholder: '',
        icon: 'pen',
        customLogicActive: null,
        delayActive: null,
        delayTime: null,
        formControlName: 'code',
        keyToChangeControl: null,
        keyToShowControl: null,
        nameCustomLogic: null,
        typeField: 'TEXT',
      },
    ];
    if (data) form.patchValue(data);
    this.modalService.openModal(FormSimpleComponent, 'Actualizar Proveedor', 'UPDATE_PROVIDER', form, configForm, data, data);
  }

  public eventDetail(data: ProviderEntity): void {
    this.router.navigateByUrl(`/back-office/accounts/detail/`);
  }

  public eventDelete(data: ProviderEntity): void {
    Swal.fire({
      icon: 'warning',
      title: '¿Deseas Eliminar?',
      text: 'Esta acción es irreversible',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        this.providerUseCaseService.deleteOne(data._id || '').subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Proceso Exitoso',
              text: 'Eliminado exitosamente',
              confirmButtonText: 'Continuar',
            });
            this.initDataTable(1, []);
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'No se ha podido eliminar',
              confirmButtonText: 'Continuar'
            });
          }
        });
      }
    });
  }

  private eventCreate(): void {
    const form: FormGroup = this._formBuilder.group({
      name: ["", Validators.required],
      code: ["", Validators.required],
    });
    const configForm: FieldFormInterface[] = [
      {
        label: 'Nombre',
        data: null,
        placeholder: '',
        icon: 'pen',
        customLogicActive: null,
        delayActive: null,
        delayTime: null,
        formControlName: 'name',
        keyToChangeControl: null,
        keyToShowControl: null,
        nameCustomLogic: null,
        typeField: 'TEXT'
      },
      {
        label: 'Código',
        data: null,
        placeholder: '',
        icon: 'pen',
        customLogicActive: null,
        delayActive: null,
        delayTime: null,
        formControlName: 'code',
        keyToChangeControl: null,
        keyToShowControl: null,
        nameCustomLogic: null,
        typeField: 'TEXT',
      },
    ];
    this.modalService.openModal(FormSimpleComponent, 'Crear Proveedor', 'CREATE_PROVIDER', form, configForm, undefined, undefined);
  }

  private initListenModalEvents(): void {
    this.listenModalEvents$ = this.modalService.finishModal.subscribe(res => {
      if (res && res.data) {
        switch (res.eventName) {
          case ('CREATE_PROVIDER'):
            this.createEventModal(res.data);
            break;
          case ('UPDATE_PROVIDER'):
            this.updateEventModal({...res.data, id: res.dataGeneric.id});
            break;
        }
      }
    })
  }

  private createEventModal(data: ProviderEntity): void {
    this.providerUseCaseService.create({...data, _id: UUID.UUID()}).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Proceso Éxitoso',
          text: 'Registro creado con éxito.',
          confirmButtonText: 'Ok'
        });
        this.initDataTable(1, []);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: '¡Ops!',
          text: 'Ocurrió un error, intentalo nuevamente.',
          confirmButtonText: 'Ok'
        })
      }
    })
  }

  private updateEventModal(data: ProviderEntity): void {
    this.providerUseCaseService.updateOne(data._id || '', data).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Proceso Éxitoso',
          text: 'Registro actualizado con éxito.',
          confirmButtonText: 'Ok'
        });
        this.initDataTable(1, []);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: '¡Ops!',
          text: 'Ocurrió un error, intentalo nuevamente.',
          confirmButtonText: 'Ok'
        })
      }
    })
  }

  ngOnDestroy() {
    this.listenModalEvents$.unsubscribe();
  }

}

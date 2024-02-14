import {Component, OnDestroy, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {FilterInterface} from "@core-interfaces/filter/filter.interface";
import {TableParentModel} from "@core-models/tables/table-parent.models";
import {TableParentInterface} from "@core-interfaces/tables/table-parent.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {UserUseCaseService} from "../../../../../../../../application/use-cases/user/user/user-use-case.service";
import {UserEntity} from "../../../../../../../../domain/entities/user/user.entity";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FieldFormInterface} from "@core-interfaces/forms/field-form.interface";
import {
  FormSimpleComponent
} from "../../../../../../../../shared/components/modal/defaults/form-simple/form-simple.component";
import {ModalService} from "../../../../../../../../shared/components/modal/services/modal.service";
import {Subscription} from "rxjs";
import {UUID} from "angular2-uuid";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends TableParentModel implements OnInit, OnDestroy, TableParentInterface {

  public title: string = 'Usuarios';
  private listenModalEvents$!: Subscription;

  constructor(
    private modalService: ModalService,
    private routeActivated: ActivatedRoute,
    private router: Router,
    private userUseCaseService: UserUseCaseService,
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
    this.userUseCaseService.getAll(filter, page).subscribe({
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
      }
    ];
    this.tableConfig = [
      {
        column_name: 'name',
        isActive: true,
        column_translate: 'Nombre',
        column_pipe: 'normal',
        column_type: {type: 'text'},
        active_search: true
      },
      {
        column_name: 'email',
        isActive: true,
        column_translate: 'Correo Electrónico',
        column_pipe: 'normal',
        column_type: {type: 'text'},
        active_search: true
      },
      {
        column_name: 'rol',
        isActive: true,
        column_translate: 'Rol',
        column_pipe: 'status',
        column_type: {type: 'select'},
        config_pipe: [
          {
            icon: 'user',
            color: '#cc2c2c',
            label: 'Admin',
            key: '1',
            id: '1'
          },
          {
            icon: 'user',
            color: '#00acd1',
            label: 'Usuario',
            key: '2',
            id: '2'
          }
        ],
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

  public listenEventFields(event: { nameEvent: string; data: UserEntity }): void {
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

  public eventUpdate(data: UserEntity): void {
    const form: FormGroup = this._formBuilder.group({
      _id: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      name: ["", Validators.required],
      img_url: ["", Validators.required],
      rol: [null, Validators.required]
    })
    if (data) form.patchValue(data);
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
        label: 'Correo',
        data: null,
        placeholder: '',
        icon: 'envelope',
        customLogicActive: null,
        delayActive: null,
        delayTime: null,
        formControlName: 'email',
        keyToChangeControl: null,
        keyToShowControl: null,
        nameCustomLogic: null,
        typeField: 'TEXT',
      },
      {
        label: 'Contraseña',
        data: null,
        placeholder: '',
        icon: 'lock',
        customLogicActive: null,
        delayActive: null,
        delayTime: null,
        formControlName: 'password',
        keyToChangeControl: null,
        keyToShowControl: null,
        nameCustomLogic: null,
        typeField: 'TEXT',
      },
      {
        label: 'Imágen',
        data: null,
        placeholder: '',
        icon: 'link',
        customLogicActive: null,
        delayActive: null,
        delayTime: null,
        formControlName: 'img_url',
        keyToChangeControl: null,
        keyToShowControl: null,
        nameCustomLogic: null,
        typeField: 'TEXT',
      },
      {
        label: 'Rol',
        data: [
          {
            id: 1,
            name: 'Administrador'
          },
          {
            id: 2,
            name: 'Usuario'
          }
        ],
        placeholder: 'Seleccione una opción',
        icon: 'lock',
        customLogicActive: null,
        delayActive: null,
        delayTime: null,
        formControlName: 'rol',
        keyToChangeControl: 'id',
        keyToShowControl: 'name',
        nameCustomLogic: null,
        typeField: 'SELECT',
      },
    ];
    this.modalService.openModal(FormSimpleComponent, 'Actualizar Usuario', 'UPDATE_BRAND', form, configForm, data, data);
  }

  public eventDetail(data: UserEntity): void {
    this.router.navigateByUrl(`/back-office/accounts/detail/`);
  }

  public eventDelete(data: UserEntity): void {
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
        this.userUseCaseService.deleteOne(data._id || '').subscribe({
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
      email: ["", Validators.required],
      password: ["", Validators.required],
      name: ["", Validators.required],
      img_url: ["", Validators.required],
      rol: [null, Validators.required]
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
        label: 'Correo',
        data: null,
        placeholder: '',
        icon: 'envelope',
        customLogicActive: null,
        delayActive: null,
        delayTime: null,
        formControlName: 'email',
        keyToChangeControl: null,
        keyToShowControl: null,
        nameCustomLogic: null,
        typeField: 'TEXT',
      },
      {
        label: 'Contraseña',
        data: null,
        placeholder: '',
        icon: 'lock',
        customLogicActive: null,
        delayActive: null,
        delayTime: null,
        formControlName: 'password',
        keyToChangeControl: null,
        keyToShowControl: null,
        nameCustomLogic: null,
        typeField: 'TEXT',
      },
      {
        label: 'Imágen',
        data: null,
        placeholder: '',
        icon: 'link',
        customLogicActive: null,
        delayActive: null,
        delayTime: null,
        formControlName: 'img_url',
        keyToChangeControl: null,
        keyToShowControl: null,
        nameCustomLogic: null,
        typeField: 'TEXT',
      },
      {
        label: 'Rol',
        data: [
          {
            id: 1,
            name: 'Administrador'
          },
          {
            id: 2,
            name: 'Usuario'
          }
        ],
        placeholder: 'Seleccione una opción',
        icon: 'lock',
        customLogicActive: null,
        delayActive: null,
        delayTime: null,
        formControlName: 'rol',
        keyToChangeControl: 'id',
        keyToShowControl: 'name',
        nameCustomLogic: null,
        typeField: 'SELECT',
      },
    ];
    this.modalService.openModal(FormSimpleComponent, 'Crear Usuario', 'CREATE_BRAND', form, configForm, undefined, undefined);
  }

  private initListenModalEvents(): void {
    this.listenModalEvents$ = this.modalService.finishModal.subscribe(res => {
      if (res && res.data) {
        switch (res.eventName) {
          case ('CREATE_BRAND'):
            this.createEventModal(res.data);
            break;
          case ('UPDATE_BRAND'):
            this.updateEventModal({...res.data, id: res.dataGeneric.id});
            break;
        }
      }
    })
  }

  private createEventModal(data: UserEntity): void {
    this.userUseCaseService.create({...data, _id: UUID.UUID()}).subscribe({
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

  private updateEventModal(data: UserEntity): void {
    this.userUseCaseService.updateOne(data._id || '', data).subscribe({
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

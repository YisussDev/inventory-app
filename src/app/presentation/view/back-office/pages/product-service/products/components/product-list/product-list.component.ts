import {Component, OnDestroy, OnInit} from '@angular/core';
import {TableParentModel} from "@core-models/tables/table-parent.models";
import {TableParentInterface} from "@core-interfaces/tables/table-parent.interface";
import {Subscription} from "rxjs";
import {ModalService} from "../../../../../../../../shared/components/modal/services/modal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FilterInterface} from "@core-interfaces/filter/filter.interface";
import {FieldFormInterface} from "@core-interfaces/forms/field-form.interface";
import {
  FormSimpleComponent
} from "../../../../../../../../shared/components/modal/defaults/form-simple/form-simple.component";
import Swal from "sweetalert2";
import {UUID} from "angular2-uuid";
import {
  ProductUseCaseService
} from "../../../../../../../../application/use-cases/product/product/product-use-case.service";
import {ProductEntity} from "../../../../../../../../domain/entities/product/product.entity";
import {ProviderEntity} from "../../../../../../../../domain/entities/provider/provider.entity";
import {
  ProviderUseCaseService
} from "../../../../../../../../application/use-cases/provider/provider/provider-use-case.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent extends TableParentModel implements OnInit, OnDestroy, TableParentInterface {

  public title: string = 'Productos';
  private listenModalEvents$!: Subscription;

  public providers: ProviderEntity[] = [];

  constructor(
    private modalService: ModalService,
    private routeActivated: ActivatedRoute,
    private router: Router,
    private productUseCaseService: ProductUseCaseService,
    private providerUseCaseService: ProviderUseCaseService,
    private _formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.initProviders();
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
    this.productUseCaseService.getAll(filter, page).subscribe({
      next: (res) => {
        this.dataTable = res.data;
        this.pagination = {...res.links, ...res.meta};
      },
      error: (err) => {

      }
    });
  }

  private initProviders(): void {
    this.providerUseCaseService.list().subscribe({
      next: (res) => {
        this.providers = res.data;
      }
    })
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
        column_name: 'name',
        isActive: true,
        column_translate: 'Nombre',
        column_pipe: 'normal',
        column_type: {type: 'text'},
        active_search: true
      },
      {
        column_name: 'description',
        isActive: true,
        column_translate: 'Descripción',
        column_pipe: 'normal',
        column_type: {type: 'text'},
        active_search: true
      },
      {
        column_name: 'model',
        isActive: true,
        column_translate: 'Modelo',
        column_pipe: 'normal',
        column_type: {type: 'text'},
        active_search: true
      },
      {
        column_name: 'quantity',
        isActive: true,
        column_translate: 'Cantidad',
        column_pipe: 'normal',
        column_type: {type: 'text'},
        active_search: false
      },
      {
        column_name: 'price',
        isActive: true,
        column_translate: 'Precio',
        column_pipe: 'cash',
        column_type: {type: 'text'},
        active_search: false
      },
      {
        column_name: 'provider_code',
        isActive: true,
        column_translate: 'Código Proveedor',
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

  public listenEventFields(event: { nameEvent: string; data: ProductEntity }): void {
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

  public eventUpdate(data: ProductEntity): void {
    const form: FormGroup = this._formBuilder.group({
      _id: ["", Validators.required],
      name: ["", Validators.required],
      description: ["", Validators.required],
      model: ["", Validators.required],
      quantity: ["", [Validators.required, Validators.min(0)]],
      price: ["", [Validators.required, Validators.min(0)]],
      provider_code: ["", Validators.required]
    });
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
        label: 'Descripción',
        data: null,
        placeholder: '',
        icon: 'pen',
        customLogicActive: null,
        delayActive: null,
        delayTime: null,
        formControlName: 'description',
        keyToChangeControl: null,
        keyToShowControl: null,
        nameCustomLogic: null,
        typeField: 'TEXT',
      },
      {
        label: 'Modelo',
        data: null,
        placeholder: '',
        icon: 'lock',
        customLogicActive: null,
        delayActive: null,
        delayTime: null,
        formControlName: 'model',
        keyToChangeControl: null,
        keyToShowControl: null,
        nameCustomLogic: null,
        typeField: 'TEXT',
      },
      {
        label: 'Cantidad',
        data: null,
        placeholder: '',
        icon: 'pen',
        customLogicActive: null,
        delayActive: null,
        delayTime: null,
        formControlName: 'quantity',
        keyToChangeControl: null,
        keyToShowControl: null,
        nameCustomLogic: null,
        typeField: 'NUMBER',
      },
      {
        label: 'Precio',
        data: null,
        placeholder: null,
        icon: 'lock',
        customLogicActive: null,
        delayActive: null,
        delayTime: null,
        formControlName: 'price',
        keyToChangeControl: 'id',
        keyToShowControl: 'name',
        nameCustomLogic: null,
        typeField: 'NUMBER',
      },
      {
        label: 'Codigo Proveedor',
        data: this.providers,
        placeholder: 'Selecciones una opción',
        icon: 'pen',
        customLogicActive: null,
        delayActive: null,
        delayTime: null,
        formControlName: 'provider_code',
        keyToChangeControl: 'name',
        keyToShowControl: 'name',
        nameCustomLogic: null,
        typeField: 'SELECT',
      },
    ];
    this.modalService.openModal(FormSimpleComponent, 'Actualizar Usuario', 'UPDATE_BRAND', form, configForm, data, data);
  }

  public eventDetail(data: ProductEntity): void {
    this.router.navigateByUrl(`/back-office/accounts/detail/`);
  }

  public eventDelete(data: ProductEntity): void {
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
        this.productUseCaseService.deleteOne(data._id || '').subscribe({
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
      description: ["", Validators.required],
      model: ["", Validators.required],
      quantity: ["", [Validators.required, Validators.min(0)]],
      price: ["", [Validators.required, Validators.min(0)]],
      provider_code: [null, Validators.required]
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
        label: 'Descripción',
        data: null,
        placeholder: '',
        icon: 'pen',
        customLogicActive: null,
        delayActive: null,
        delayTime: null,
        formControlName: 'description',
        keyToChangeControl: null,
        keyToShowControl: null,
        nameCustomLogic: null,
        typeField: 'TEXT',
      },
      {
        label: 'Modelo',
        data: null,
        placeholder: '',
        icon: 'lock',
        customLogicActive: null,
        delayActive: null,
        delayTime: null,
        formControlName: 'model',
        keyToChangeControl: null,
        keyToShowControl: null,
        nameCustomLogic: null,
        typeField: 'TEXT',
      },
      {
        label: 'Cantidad',
        data: null,
        placeholder: '',
        icon: 'pen',
        customLogicActive: null,
        delayActive: null,
        delayTime: null,
        formControlName: 'quantity',
        keyToChangeControl: null,
        keyToShowControl: null,
        nameCustomLogic: null,
        typeField: 'NUMBER',
      },
      {
        label: 'Precio',
        data: null,
        placeholder: null,
        icon: 'lock',
        customLogicActive: null,
        delayActive: null,
        delayTime: null,
        formControlName: 'price',
        keyToChangeControl: 'id',
        keyToShowControl: 'name',
        nameCustomLogic: null,
        typeField: 'NUMBER',
      },
      {
        label: 'Codigo Proveedor',
        data: this.providers,
        placeholder: 'Selecciones una opción',
        icon: 'pen',
        customLogicActive: null,
        delayActive: null,
        delayTime: null,
        formControlName: 'provider_code',
        keyToChangeControl: 'name',
        keyToShowControl: 'name',
        nameCustomLogic: null,
        typeField: 'SELECT',
      },
    ];
    this.modalService.openModal(FormSimpleComponent, 'Crear Producto', 'CREATE_BRAND', form, configForm, undefined, undefined);
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

  private createEventModal(data: ProductEntity): void {
    this.productUseCaseService.create({...data, _id: UUID.UUID()}).subscribe({
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

  private updateEventModal(data: ProductEntity): void {
    this.productUseCaseService.updateOne(data._id || '', data).subscribe({
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

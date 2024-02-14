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
import {SaleUseCaseService} from "../../../../../../../../application/use-cases/sale/sale/sale-use-case.service";
import {SaleEntity} from "../../../../../../../../domain/entities/sale/sale.entity";
import * as moment from "moment";
import {ExcelService} from "@core-services/utils/excel.service";

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css']
})
export class SalesListComponent extends TableParentModel implements OnInit, OnDestroy, TableParentInterface {

  public title: string = 'Ventas';
  private listenModalEvents$!: Subscription;

  constructor(
    private excelService: ExcelService,
    private modalService: ModalService,
    private routeActivated: ActivatedRoute,
    private router: Router,
    private saleUseCaseService: SaleUseCaseService,
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
    this.saleUseCaseService.getAll(filter, page).subscribe({
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
      },
      {
        nameEvent: 'REPORT',
        label: 'Generar Reporte',
        icon: 'file-export'
      },
    ];
    this.quicklyActions = [
      {
        icon: 'eye',
        nameEvent: 'DETAIL',
        label: 'Ver'
      },
    ];
    this.tableConfig = [
      {
        column_name: 'document_client',
        isActive: true,
        column_translate: 'Documento Cliente',
        column_pipe: 'normal',
        column_type: {type: 'text'},
        active_search: true
      },
      {
        column_name: 'date_sale',
        isActive: true,
        column_translate: 'Fecha de Venta',
        column_pipe: 'normal',
        column_type: {type: 'text'},
        active_search: true
      },
      {
        column_name: 'total_value',
        isActive: true,
        column_translate: 'Precio Total',
        column_pipe: 'cash',
        column_type: {type: 'text'},
        active_search: false
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

  public listenEventFields(event: { nameEvent: string; data: SaleEntity }): void {
    switch (event.nameEvent) {
      case ('UPDATE'):
        this.eventUpdate(event.data);
        break;
      case ('DETAIL'):
        this.eventDetail(event.data);
        break;
      case ('DELETE'):
        this.eventDelete(event.data);
        break;
      case ('CREATE'):
        this.eventCreate();
        break;
      case ('REPORT'):
        this.eventReport();
        break;
    }
  }

  public eventUpdate(data: SaleEntity): void {
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
    ];
    this.modalService.openModal(FormSimpleComponent, 'Actualizar Usuario', 'UPDATE_BRAND', form, configForm, data, data);
  }

  public eventDetail(data: SaleEntity): void {
    this.router.navigateByUrl(`/back-office/sales/detail/${data._id}`);
  }

  public eventDelete(data: SaleEntity): void {
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
        this.saleUseCaseService.deleteOne(data._id || '').subscribe({
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
    this.router.navigateByUrl('/back-office/sales/create')
  }

  private eventReport(): void {
    const dateToday = moment().subtract(1, 'days').toISOString().split('T')[0];
    const form: FormGroup = this._formBuilder.group({
      date: [dateToday, Validators.required],
    });
    const configForm: FieldFormInterface[] = [
      {
        label: 'Fecha de Reporte',
        data: null,
        placeholder: '',
        icon: 'calendar',
        customLogicActive: null,
        delayActive: null,
        delayTime: null,
        formControlName: 'date',
        keyToChangeControl: null,
        keyToShowControl: null,
        nameCustomLogic: null,
        typeField: 'DATE'
      },
    ];
    this.modalService.openModal(FormSimpleComponent, 'Generar Reporte', 'SELECT_DATE', form, configForm, undefined, undefined);
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
          case ('SELECT_DATE'):
            this.reportEventModal(res.data);
            break;
        }
      }
    })
  }

  private createEventModal(data: SaleEntity): void {
    this.saleUseCaseService.create({...data, _id: UUID.UUID()}).subscribe({
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

  private updateEventModal(data: SaleEntity): void {
    this.saleUseCaseService.updateOne(data._id || '', data).subscribe({
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

  private reportEventModal(data: { date: string }): void {
    const filter: FilterInterface = {
      orSingleQueries: [["date_sale", "LIKE", `%${moment(data.date).format('L')}%`]]
    }
    this.saleUseCaseService.getAll(filter, 1).subscribe({
      next: (res) => {
        this.excelService.exportToExcel(res.data, `REPORTSALES${data.date}.xlsx`);
        Swal.fire({
          icon: 'success',
          title: 'Proceso Exitoso',
          text: 'Reporte generado exitosamente.',
          confirmButtonText: 'Ok'
        })
      },
      error: (err) => {

      }
    })
  }

  ngOnDestroy() {
    this.listenModalEvents$.unsubscribe();
  }

}

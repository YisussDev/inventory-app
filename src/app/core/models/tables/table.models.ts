import {FormBuilder, FormGroup} from "@angular/forms";
import {debounceTime} from "rxjs";
import {Router} from "@angular/router";
import {TableFieldActionsInterface} from "../../interfaces/tables/table-field-actions.interface";
import {TableConfigInterface} from "../../interfaces/tables/table-config.interface";
import {generateQuerySearchUrl} from "../../helpers/tables/helper-table";

export class TableModel {

  public formSearchQueries!: FormGroup;
  public configActionsEvent: TableFieldActionsInterface[] = [];
  public tableConfig: TableConfigInterface[] = [];

  private tableName!: string;


  constructor(private _formBuilder: FormBuilder, private _router: Router) {
    this._formBuilder = _formBuilder;
    this._router = _router;
  }


  initConfigActionsEvents(configActions: any[]): void {
    this.configActionsEvent = configActions;
  }

  tableConfigColumns(field: any): boolean {
    let stateColumn = false
    for (const config of this.tableConfig) {
      const columnNme = config.column_name;
      if (columnNme === field && config.isActive) stateColumn = true;
    }
    return stateColumn;
  }

  initTableConfig(configTable: TableConfigInterface[]): void {
    this.tableConfig = configTable;
  }

  initFormQueries(): void {
    this.formSearchQueries = this._formBuilder.group({});
    this.formSearchQueries.addControl('search', this._formBuilder.control(''));
    for (let field of this.tableConfig) {
      this.formSearchQueries.addControl(field.column_name, this._formBuilder.control(null));
    }
    this.formSearchQueries.valueChanges.pipe(
      debounceTime(500)
    ).subscribe({
      next: (formData) => {
        const queryGenerated = generateQuerySearchUrl(formData);
        const path: string = window.location.pathname;
        this._router.navigateByUrl(`${path}?page=1${queryGenerated}`)
      }
    })
  }

  initTableName(name: string): void {
    this.tableName = name;
  }

  targetZone(event: any) {
    event.preventDefault();
  }

  dropZone(event: any) {
    const positionZone = event.target.getAttribute('position');
    const positionInitial = event.dataTransfer.getData('position');
    [this.tableConfig[positionInitial], this.tableConfig[positionZone]] = [this.tableConfig[positionZone], this.tableConfig[positionInitial]]

  }

  dragInitial(event: any) {
    event.dataTransfer.setData('position', event.target.getAttribute('position'));
  }

  changeColumnVisible(data: any) {
    for (const config of this.tableConfig) {
      const columnNme = config.column_name;
      if (columnNme === data.column_name) config.isActive = !data.isActive;
      localStorage.setItem(this.tableName, JSON.stringify(this.tableConfig));
    }
  }

  getDataColumn(columnName: string, data: any): string | number {
    const indexPoint = columnName.indexOf('.');
    if (!(indexPoint !== -1)) {
      return data[columnName];
    } else {
      return data[columnName.slice(0, indexPoint)][columnName.slice(indexPoint + 1)];
    }
  }
}

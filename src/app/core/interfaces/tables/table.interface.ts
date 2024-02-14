import {EventEmitter} from "@angular/core";
import {PaginationInterface} from "./pagination.interface";
import {TableFieldActionsInterface} from "./table-field-actions.interface";
import {TableConfigInterface} from "./table-config.interface";

export interface TableInterface {
  pagePosition: number;
  perPage: number;
  defaultTableData: any[];
  pagination: PaginationInterface;
  configTable: TableConfigInterface[];
  nameTable: string;
  isLoading: boolean;
  validActions: boolean;
  tableFieldActions: TableFieldActionsInterface[];
  eventField: EventEmitter<any>;
  eventSearch: EventEmitter<any>;
  eventRow(data: any, nameEvent: string): void;
}

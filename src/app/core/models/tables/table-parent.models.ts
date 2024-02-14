import {TableConfigInterface} from "../../interfaces/tables/table-config.interface";
import {PaginationInterface} from "../../interfaces/tables/pagination.interface";
import {TableFieldActionsInterface} from "../../interfaces/tables/table-field-actions.interface";
import {
  ConfigPrincipleRowInterface
} from "../../../shared/components/tables/table-mobile/interfaces/configPrincipleRow.interface";
import {ActionEvent} from "@core-interfaces/tables/principal-events.interface";


export class TableParentModel {

  public tableConfig!: TableConfigInterface[];

  public dataTable: any[] = [];

  public pagination!: PaginationInterface;

  public tableFieldActions!: TableFieldActionsInterface[];

  public configPrincipleMobile!: ConfigPrincipleRowInterface;

  public principalActions: ActionEvent[] = [];
  public quicklyActions: ActionEvent[] = [];

  buildQueriesToFilter(params: any, configTable?: TableConfigInterface[]): string[][] {
    if (!params) return [];
    const keys = Object.keys(params);
    const buildedParams: any[] = [];
    for (let key of keys) {
      if (key != 'page' && key != 'search' && !key.includes('.') && params[key]) {
        buildedParams.push([`${key}`, "LIKE", `%${params[key]}%`])
      }
      if (key == 'search') {
        if (!configTable) return [];
        for (let configColumn of configTable) {
          if (!configColumn.column_name.includes('.')) {
            buildedParams.push([`${configColumn.column_name}`, "LIKE", `%${params[key]}%`])
          }
        }
      }
    }
    return buildedParams;
  }

}

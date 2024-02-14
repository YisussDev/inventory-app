import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfigPrincipleRowInterface} from "../../interfaces/configPrincipleRow.interface";
import {TableConfigInterface} from "@core-interfaces/tables/table-config.interface";
import {TableFieldActionsInterface} from "@core-interfaces/tables/table-field-actions.interface";

@Component({
  selector: 'app-item-table-mobile',
  templateUrl: './item-table-mobile.component.html',
  styleUrls: ['./item-table-mobile.component.css']
})
export class ItemTableMobileComponent implements OnInit {

  @Input() dataRow!: any;
  @Input() collapsed: boolean = true;
  @Input() configTable!: TableConfigInterface[];
  @Input() tableFieldActions!: TableFieldActionsInterface[];
  @Input() configPrinciplesRow!: ConfigPrincipleRowInterface;
  @Input() showHeaderTable!: boolean;
  @Input() validActions: boolean = false;

  @Output() eventClick: EventEmitter<any> = new EventEmitter<any>();


  ngOnInit() {
  }

  changeCollapsed(event: any): void {
    if (event.target.className == 'header-item') {
      this.collapsed = !this.collapsed;
    }
  }

  tableConfigColumns(field: any): boolean {
    let stateColumn = false
    for (const config of this.configTable) {
      const columnNme = config.column_name;
      if (columnNme === field && config.isActive) stateColumn = true;
    }
    return stateColumn;
  }

  eventRow(data: any, nameEvent?: string | null): void {
    this.eventClick.emit({data, nameEvent});
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

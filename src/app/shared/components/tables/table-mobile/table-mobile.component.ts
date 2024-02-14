import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {ConfigPrincipleRowInterface} from "./interfaces/configPrincipleRow.interface";
import {TableModel} from "@core-models/tables/table.models";
import {TableConfigInterface} from "@core-interfaces/tables/table-config.interface";
import {PaginationInterface} from "@core-interfaces/tables/pagination.interface";
import {TableFieldActionsInterface} from "@core-interfaces/tables/table-field-actions.interface";

@Component({
  selector: 'app-table-mobile',
  templateUrl: './table-mobile.component.html',
  styleUrls: ['./table-mobile.component.css']
})
export class TableMobileComponent extends TableModel implements OnInit {

  @Input() title: string = '';

  @Input() configTable!: TableConfigInterface[];
  @Input() defaultTableData!: any[];
  @Input() pagination!: PaginationInterface;
  @Input() perPage!: number;
  @Input() tableFieldActions!: TableFieldActionsInterface[];
  @Input() validActions!: boolean;
  @Input() configPrinciplesRow!: ConfigPrincipleRowInterface;
  @Input() showHeaderTable: boolean = false;
  @Input() searchActions: boolean = false;

  @Input() isResponsive: boolean = false;

  @Output() eventField: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventSearch: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    super(formBuilder, router);
  }

  ngOnInit() {
    // this.initTableName(this.nameTable);
    this.initTableConfig(this.configTable);
    this.initConfigActionsEvents(this.tableFieldActions);
    this.initFormQueries();
  }

  eventRow(data: any): void {
    this.eventField.emit(data);
  }

}

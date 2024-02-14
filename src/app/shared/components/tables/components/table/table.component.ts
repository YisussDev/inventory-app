import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {TableModel} from "@core-models/tables/table.models";
import {TableInterface} from "@core-interfaces/tables/table.interface";
import {TableConfigInterface} from "@core-interfaces/tables/table-config.interface";
import {PaginationInterface} from "@core-interfaces/tables/pagination.interface";
import {TableFieldActionsInterface} from "@core-interfaces/tables/table-field-actions.interface";
import {ActionEvent} from "@core-interfaces/tables/principal-events.interface";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent extends TableModel implements TableInterface, OnInit {

  @Input() configTable!: TableConfigInterface[];
  @Input() defaultTableData!: any[];
  @Input() isLoading!: boolean;
  @Input() nameTable!: string;
  @Input() pagePosition: number = 10;
  @Input() pagination!: PaginationInterface;
  @Input() perPage!: number;
  @Input() tableFieldActions!: TableFieldActionsInterface[];
  @Input() validActions: boolean = false;
  @Input() searchActions: boolean = false;

  @Input() principalActions: ActionEvent[] = [];
  @Input() quicklyActions: ActionEvent[] = [];

  @Output() eventField: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventSearch: EventEmitter<any> = new EventEmitter<any>();

  searchInput: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    super(formBuilder, router);
  }

  ngOnInit() {
    this.initTableName(this.nameTable);
    this.initTableConfig(this.configTable);
    this.initConfigActionsEvents(this.tableFieldActions);
    this.initFormQueries();
  }

  eventRow(data: any, nameEvent: string): void {
    this.eventField.emit({data, nameEvent});
  }

  newSearch(): void {
    this.eventSearch.emit(this.searchInput);
  }
}

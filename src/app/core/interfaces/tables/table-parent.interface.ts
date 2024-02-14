export interface TableParentInterface{
  initDataTable(page?: number): void;
  initTableConfig(): void;
  initListenQueryParams(): void;
  initTableFieldsActions(): void;
  listenEventFields(data: any): void;
  eventUpdate(data: any): void;
  eventDetail(data: any): void;
  eventDelete(data: any): void;
}

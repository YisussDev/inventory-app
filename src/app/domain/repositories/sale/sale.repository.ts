import {SaleEntity} from "../../entities/sale/sale.entity";
import {BaseHttpModel} from "@core-models/http/base-http.model";
import {FilterInterface} from "@core-interfaces/filter/filter.interface";
import {Observable} from "rxjs";
import {HttpResponseInterface} from "@core-models/http/http-response.interface";

export abstract class SaleRepository implements BaseHttpModel<SaleEntity> {

  abstract getAll(filter: FilterInterface, page?: number): Observable<HttpResponseInterface<SaleEntity>>;

  abstract getOne(filter: FilterInterface): Observable<HttpResponseInterface<SaleEntity>>;

  abstract create(data: SaleEntity): Observable<SaleEntity>;

  abstract updateOne(id: string, data: SaleEntity): Observable<{data: SaleEntity}>;

  abstract deleteOne(id: string): Observable<HttpResponseInterface<SaleEntity>>;

}

import {Observable} from "rxjs";
import {HttpResponseInterface} from "@core-models/http/http-response.interface";
import {FilterInterface} from "@core-interfaces/filter/filter.interface";

export abstract class BaseHttpModel<EntityLocal> {

  abstract getAll(filter: FilterInterface): Observable<HttpResponseInterface<EntityLocal>>;

  abstract getOne(filter: FilterInterface): Observable<HttpResponseInterface<EntityLocal>>;

  abstract create(data: EntityLocal): Observable<EntityLocal>;

  abstract updateOne(id: string, data: EntityLocal): Observable<{data: EntityLocal}>;

  abstract deleteOne(id: string): Observable<HttpResponseInterface<EntityLocal>>;

}

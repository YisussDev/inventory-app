import {AuditEntity} from "../../entities/audit/audit.entity";
import {BaseHttpModel} from "@core-models/http/base-http.model";
import {FilterInterface} from "@core-interfaces/filter/filter.interface";
import {Observable} from "rxjs";
import {HttpResponseInterface} from "@core-models/http/http-response.interface";

export abstract class AuditRepository implements BaseHttpModel<AuditEntity> {

  abstract getAll(filter: FilterInterface, page?: number): Observable<HttpResponseInterface<AuditEntity>>;

  abstract getOne(filter: FilterInterface): Observable<HttpResponseInterface<AuditEntity>>;

  abstract create(data: AuditEntity): Observable<AuditEntity>;

  abstract updateOne(id: string, data: AuditEntity): Observable<{data: AuditEntity}>;

  abstract deleteOne(id: string): Observable<HttpResponseInterface<AuditEntity>>;

}

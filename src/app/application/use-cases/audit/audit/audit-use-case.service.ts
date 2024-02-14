import {Injectable} from "@angular/core";
import {
  AuditImplementation
} from "../../../../infrastructure/adapters/api/implementation/audit/audit.implementation";
import {Observable} from "rxjs";
import {HttpResponseInterface} from "@core-models/http/http-response.interface";
import {AuditEntity} from "../../../../domain/entities/audit/audit.entity";
import {FilterInterface} from "@core-interfaces/filter/filter.interface";
import {AuditRepository} from "../../../../domain/repositories/audit/audit.repository";

@Injectable()
export class AuditUseCaseService implements AuditRepository {

  constructor(
    private accountImplementation: AuditImplementation
  ) {
  }

  public getAll(filter: FilterInterface, page?: number): Observable<HttpResponseInterface<AuditEntity>> {
    return this.accountImplementation.getAll(filter, page);
  }

  public getOne(filter: FilterInterface): Observable<HttpResponseInterface<AuditEntity>> {
    return this.accountImplementation.getOne(filter);
  }

  public create(data: AuditEntity): Observable<AuditEntity> {
    return this.accountImplementation.create(data);
  }

  public updateOne(id: string, data: AuditEntity): Observable<{data: AuditEntity}> {
    return this.accountImplementation.updateOne(id, data);
  }

  public deleteOne(id: string): Observable<HttpResponseInterface<AuditEntity>> {
    return this.accountImplementation.deleteOne(id);
  }


}

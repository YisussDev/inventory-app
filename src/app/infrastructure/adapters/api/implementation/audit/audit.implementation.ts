import {Injectable} from "@angular/core";
import {AuditRepository} from "../../../../../domain/repositories/audit/audit.repository";
import {FilterInterface} from "@core-interfaces/filter/filter.interface";
import {map, Observable} from "rxjs";
import {HttpResponseInterface} from "@core-models/http/http-response.interface";
import {AuditEntity} from "../../../../../domain/entities/audit/audit.entity";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import {AuditMapper} from "../../mapper/audit/audit.mapper";
import {AuditApiModel} from "../../models/audit/audit-api.model";

@Injectable()
export class AuditImplementation implements AuditRepository {

  private readonly apiUrl: string = environment.url;
  private readonly apiResource: string = environment.audit_service.api_resource;
  private readonly apiList: string = environment.audit_service.api_resource;

  private mapper = new AuditMapper();

  constructor(
    private _http: HttpClient
  ) {
  }

  public getAll(filter: FilterInterface, page?: number): Observable<HttpResponseInterface<AuditEntity>> {
    const headers = new HttpHeaders({
      "x-filter-model": JSON.stringify(filter)
    })
    return this._http.get<HttpResponseInterface<AuditEntity>>(`${this.apiUrl + this.apiList}?page=${page || 1}`, {headers}).pipe(
      map(response => {
        response.data.map((entityApi: AuditApiModel) => this.mapper.mapFrom(entityApi))
        return response;
      })
    );
  }

  public getOne(filter: FilterInterface): Observable<HttpResponseInterface<AuditEntity>> {
    const headers = new HttpHeaders({
      "x-filter-model": JSON.stringify(filter)
    })
    return this._http.get<HttpResponseInterface<AuditEntity>>(`${this.apiUrl + this.apiList}`, {headers}).pipe(
      map(response => {
        response.data.map((entityApi: AuditApiModel) => this.mapper.mapFrom(entityApi))
        return response;
      })
    );
  }

  public create(data: AuditEntity): Observable<AuditEntity> {
    return this._http.post<AuditEntity>(`${this.apiUrl + this.apiResource}`, data);
  }

  public updateOne(id: string, data: AuditEntity): Observable<{ data: AuditEntity }> {
    return this._http.patch<{ data: AuditEntity }>(`${this.apiUrl + this.apiResource}/${id}`, data);
  }

  public deleteOne(id: string): Observable<HttpResponseInterface<AuditEntity>> {
    return this._http.delete<HttpResponseInterface<AuditEntity>>(`${this.apiUrl + this.apiResource}/${id}`,);
  }
}

import {Injectable} from "@angular/core";
import {ProviderRepository} from "../../../../../domain/repositories/provider/provider.repository";
import {FilterInterface} from "@core-interfaces/filter/filter.interface";
import {map, Observable} from "rxjs";
import {HttpResponseInterface} from "@core-models/http/http-response.interface";
import {ProviderEntity} from "../../../../../domain/entities/provider/provider.entity";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import {ProviderMapper} from "../../mapper/provider/provider.mapper";
import {ProviderApiModel} from "../../models/provider/provider-api.model";

@Injectable()
export class ProviderImplementation implements ProviderRepository {

  private readonly apiUrl: string = environment.url;
  private readonly apiResource: string = environment.provider_service.api_resource;
  private readonly apiList: string = environment.provider_service.api_resource;

  private mapper = new ProviderMapper();

  constructor(
    private _http: HttpClient
  ) {
  }

  public getAll(filter: FilterInterface, page?: number): Observable<HttpResponseInterface<ProviderEntity>> {
    const headers = new HttpHeaders({
      "x-filter-model": JSON.stringify(filter)
    })
    return this._http.get<HttpResponseInterface<ProviderEntity>>(`${this.apiUrl + this.apiList}?page=${page || 1}`, {headers}).pipe(
      map(response => {
        response.data.map((entityApi: ProviderApiModel) => this.mapper.mapFrom(entityApi))
        return response;
      })
    );
  }

  public list(): Observable<HttpResponseInterface<ProviderEntity>> {
    return this._http.get<HttpResponseInterface<ProviderEntity>>(`${this.apiUrl + this.apiResource}/list`).pipe(
      map(response => {
        response.data.map((entityApi: ProviderApiModel) => this.mapper.mapFrom(entityApi))
        return response;
      })
    );
  }

  public getOne(filter: FilterInterface): Observable<HttpResponseInterface<ProviderEntity>> {
    const headers = new HttpHeaders({
      "x-filter-model": JSON.stringify(filter)
    })
    return this._http.get<HttpResponseInterface<ProviderEntity>>(`${this.apiUrl + this.apiList}`, {headers}).pipe(
      map(response => {
        response.data.map((entityApi: ProviderApiModel) => this.mapper.mapFrom(entityApi))
        return response;
      })
    );
  }

  public create(data: ProviderEntity): Observable<ProviderEntity> {
    return this._http.post<ProviderEntity>(`${this.apiUrl + this.apiResource}/create`, data);
  }

  public updateOne(id: string, data: ProviderEntity): Observable<{ data: ProviderEntity }> {
    return this._http.patch<{ data: ProviderEntity }>(`${this.apiUrl + this.apiResource}/update/${id}`, data);
  }

  public deleteOne(id: string): Observable<HttpResponseInterface<ProviderEntity>> {
    return this._http.delete<HttpResponseInterface<ProviderEntity>>(`${this.apiUrl + this.apiResource}/${id}`,);
  }
}

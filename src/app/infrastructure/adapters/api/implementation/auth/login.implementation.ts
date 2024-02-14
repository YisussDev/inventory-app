import {Injectable} from "@angular/core";
import {LoginRepository} from "../../../../../domain/repositories/auth/login.repository";
import {FilterInterface} from "@core-interfaces/filter/filter.interface";
import {map, Observable} from "rxjs";
import {HttpResponseInterface} from "@core-models/http/http-response.interface";
import {LoginEntity} from "../../../../../domain/entities/auth/login.entity";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import {LoginMapper} from "../../mapper/auth/login.mapper";
import {LoginApiModel} from "../../models/auth/login-api.model";

@Injectable()
export class LoginImplementation implements LoginRepository {

  private readonly apiUrl: string = environment.auth.uri;
  private readonly apiResource: string = environment.auth.login.api_resource;
  private readonly apiList: string = '';

  private mapper = new LoginMapper();

  constructor(
    private _http: HttpClient
  ) {
  }

  public getAll(filter: FilterInterface, page?: number): Observable<HttpResponseInterface<LoginEntity>> {
    const headers = new HttpHeaders({
      "x-filter-model": JSON.stringify(filter)
    })
    return this._http.get<HttpResponseInterface<LoginEntity>>(`${this.apiUrl + this.apiList}?page=${page || 1}`, {headers}).pipe(
      map(response => {
        response.data.map((entityApi: LoginApiModel) => this.mapper.mapFrom(entityApi))
        return response;
      })
    );
  }

  public getOne(filter: FilterInterface): Observable<HttpResponseInterface<LoginEntity>> {
    const headers = new HttpHeaders({
      "x-filter-model": JSON.stringify(filter)
    })
    return this._http.get<HttpResponseInterface<LoginEntity>>(`${this.apiUrl + this.apiList}`, {headers}).pipe(
      map(response => {
        response.data.map((entityApi: LoginApiModel) => this.mapper.mapFrom(entityApi))
        return response;
      })
    );
  }

  public create(data: LoginEntity): Observable<LoginEntity> {
    return this._http.post<LoginEntity>(`${this.apiUrl + this.apiResource}`, data);
  }

  public updateOne(id: string, data: LoginEntity): Observable<{ data: LoginEntity }> {
    return this._http.patch<{ data: LoginEntity }>(`${this.apiUrl + this.apiResource}/${id}`, data);
  }

  public deleteOne(id: string): Observable<HttpResponseInterface<LoginEntity>> {
    return this._http.delete<HttpResponseInterface<LoginEntity>>(`${this.apiUrl + this.apiResource}/${id}`,);
  }

  public login(form: LoginEntity): Observable<LoginEntity> {
    return this._http.post<LoginEntity>(`${this.apiUrl}${this.apiResource}`, form);
  }

}

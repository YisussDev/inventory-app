import {Injectable} from "@angular/core";
import {UserRepository} from "../../../../../domain/repositories/user/user.repository";
import {FilterInterface} from "@core-interfaces/filter/filter.interface";
import {map, Observable} from "rxjs";
import {HttpResponseInterface} from "@core-models/http/http-response.interface";
import {UserEntity} from "../../../../../domain/entities/user/user.entity";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import {UserMapper} from "../../mapper/user/user.mapper";
import {UserApiModel} from "../../models/user/user-api.model";

@Injectable()
export class UserImplementation implements UserRepository {

  private readonly apiUrl: string = environment.url;
  private readonly apiResource: string = environment.user_service.users.api_resource;
  private readonly apiList: string = environment.user_service.users.api_resource;

  private mapper = new UserMapper();

  constructor(
    private _http: HttpClient
  ) {
  }

  public getAll(filter: FilterInterface, page?: number): Observable<HttpResponseInterface<UserEntity>> {
    const headers = new HttpHeaders({
      "x-filter-model": JSON.stringify(filter)
    })
    return this._http.get<HttpResponseInterface<UserEntity>>(`${this.apiUrl + this.apiList}?page=${page || 1}`, {headers}).pipe(
      map(response => {
        response.data.map((entityApi: UserApiModel) => this.mapper.mapFrom(entityApi))
        return response;
      })
    );
  }

  public getOne(filter: FilterInterface): Observable<HttpResponseInterface<UserEntity>> {
    const headers = new HttpHeaders({
      "x-filter-model": JSON.stringify(filter)
    })
    return this._http.get<HttpResponseInterface<UserEntity>>(`${this.apiUrl + this.apiList}`, {headers}).pipe(
      map(response => {
        response.data.map((entityApi: UserApiModel) => this.mapper.mapFrom(entityApi))
        return response;
      })
    );
  }

  public create(data: UserEntity): Observable<UserEntity> {
    return this._http.post<UserEntity>(`${this.apiUrl + this.apiResource}/create`, data);
  }

  public updateOne(id: string, data: UserEntity): Observable<{ data: UserEntity }> {
    return this._http.patch<{ data: UserEntity }>(`${this.apiUrl + this.apiResource}/update/${id}`, data);
  }

  public deleteOne(id: string): Observable<HttpResponseInterface<UserEntity>> {
    return this._http.delete<HttpResponseInterface<UserEntity>>(`${this.apiUrl + this.apiResource}/${id}`,);
  }
}

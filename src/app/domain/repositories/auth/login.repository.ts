import {LoginEntity} from "../../entities/auth/login.entity";
import {BaseHttpModel} from "@core-models/http/base-http.model";
import {FilterInterface} from "@core-interfaces/filter/filter.interface";
import {Observable} from "rxjs";
import {HttpResponseInterface} from "@core-models/http/http-response.interface";

export abstract class LoginRepository implements BaseHttpModel<LoginEntity> {

  abstract getAll(filter: FilterInterface, page?: number): Observable<HttpResponseInterface<LoginEntity>>;

  abstract getOne(filter: FilterInterface): Observable<HttpResponseInterface<LoginEntity>>;

  abstract create(data: LoginEntity): Observable<LoginEntity>;

  abstract updateOne(id: string, data: LoginEntity): Observable<{ data: LoginEntity }>;

  abstract deleteOne(id: string): Observable<HttpResponseInterface<LoginEntity>>;

  abstract login(form: LoginEntity): Observable<LoginEntity>;

}

import {UserEntity} from "../../entities/user/user.entity";
import {BaseHttpModel} from "@core-models/http/base-http.model";
import {FilterInterface} from "@core-interfaces/filter/filter.interface";
import {Observable} from "rxjs";
import {HttpResponseInterface} from "@core-models/http/http-response.interface";

export abstract class UserRepository implements BaseHttpModel<UserEntity> {

  abstract getAll(filter: FilterInterface, page?: number): Observable<HttpResponseInterface<UserEntity>>;

  abstract getOne(filter: FilterInterface): Observable<HttpResponseInterface<UserEntity>>;

  abstract create(data: UserEntity): Observable<UserEntity>;

  abstract updateOne(id: string, data: UserEntity): Observable<{data: UserEntity}>;

  abstract deleteOne(id: string): Observable<HttpResponseInterface<UserEntity>>;

}

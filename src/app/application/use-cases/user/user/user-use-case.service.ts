import {Injectable} from "@angular/core";
import {
  UserImplementation
} from "../../../../infrastructure/adapters/api/implementation/user/user.implementation";
import {Observable} from "rxjs";
import {HttpResponseInterface} from "@core-models/http/http-response.interface";
import {UserEntity} from "../../../../domain/entities/user/user.entity";
import {FilterInterface} from "@core-interfaces/filter/filter.interface";
import {UserRepository} from "../../../../domain/repositories/user/user.repository";

@Injectable()
export class UserUseCaseService implements UserRepository {

  constructor(
    private accountImplementation: UserImplementation
  ) {
  }

  public getAll(filter: FilterInterface, page?: number): Observable<HttpResponseInterface<UserEntity>> {
    return this.accountImplementation.getAll(filter, page);
  }

  public getOne(filter: FilterInterface): Observable<HttpResponseInterface<UserEntity>> {
    return this.accountImplementation.getOne(filter);
  }

  public create(data: UserEntity): Observable<UserEntity> {
    return this.accountImplementation.create(data);
  }

  public updateOne(id: string, data: UserEntity): Observable<{data: UserEntity}> {
    return this.accountImplementation.updateOne(id, data);
  }

  public deleteOne(id: string): Observable<HttpResponseInterface<UserEntity>> {
    return this.accountImplementation.deleteOne(id);
  }


}

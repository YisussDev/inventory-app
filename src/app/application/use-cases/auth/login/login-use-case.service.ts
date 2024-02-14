import {Injectable} from "@angular/core";
import {
  LoginImplementation
} from "../../../../infrastructure/adapters/api/implementation/auth/login.implementation";
import {Observable} from "rxjs";
import {HttpResponseInterface} from "@core-models/http/http-response.interface";
import {LoginEntity} from "../../../../domain/entities/auth/login.entity";
import {FilterInterface} from "@core-interfaces/filter/filter.interface";
import {LoginRepository} from "../../../../domain/repositories/auth/login.repository";

@Injectable()
export class LoginUseCaseService implements LoginRepository {

  constructor(
    private accountImplementation: LoginImplementation
  ) {
  }

  public getAll(filter: FilterInterface, page?: number): Observable<HttpResponseInterface<LoginEntity>> {
    return this.accountImplementation.getAll(filter, page);
  }

  public getOne(filter: FilterInterface): Observable<HttpResponseInterface<LoginEntity>> {
    return this.accountImplementation.getOne(filter);
  }

  public create(data: LoginEntity): Observable<LoginEntity> {
    return this.accountImplementation.create(data);
  }

  public updateOne(id: string, data: LoginEntity): Observable<{ data: LoginEntity }> {
    return this.accountImplementation.updateOne(id, data);
  }

  public deleteOne(id: string): Observable<HttpResponseInterface<LoginEntity>> {
    return this.accountImplementation.deleteOne(id);
  }

  public login(form: LoginEntity): Observable<LoginEntity> {
    return this.accountImplementation.login(form);
  }


}

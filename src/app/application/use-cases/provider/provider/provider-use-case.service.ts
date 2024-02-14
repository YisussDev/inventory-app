import {Injectable} from "@angular/core";
import {
  ProviderImplementation
} from "../../../../infrastructure/adapters/api/implementation/provider/provider.implementation";
import {Observable} from "rxjs";
import {HttpResponseInterface} from "@core-models/http/http-response.interface";
import {ProviderEntity} from "../../../../domain/entities/provider/provider.entity";
import {FilterInterface} from "@core-interfaces/filter/filter.interface";
import {ProviderRepository} from "../../../../domain/repositories/provider/provider.repository";

@Injectable()
export class ProviderUseCaseService implements ProviderRepository {

  constructor(
    private accountImplementation: ProviderImplementation
  ) {
  }

  public getAll(filter: FilterInterface, page?: number): Observable<HttpResponseInterface<ProviderEntity>> {
    return this.accountImplementation.getAll(filter, page);
  }

  public getOne(filter: FilterInterface): Observable<HttpResponseInterface<ProviderEntity>> {
    return this.accountImplementation.getOne(filter);
  }

  public create(data: ProviderEntity): Observable<ProviderEntity> {
    return this.accountImplementation.create(data);
  }

  public updateOne(id: string, data: ProviderEntity): Observable<{ data: ProviderEntity }> {
    return this.accountImplementation.updateOne(id, data);
  }

  public deleteOne(id: string): Observable<HttpResponseInterface<ProviderEntity>> {
    return this.accountImplementation.deleteOne(id);
  }

  public list(): Observable<HttpResponseInterface<ProviderEntity>> {
    return this.accountImplementation.list();
  }


}

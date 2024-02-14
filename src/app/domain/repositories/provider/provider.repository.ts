import {ProviderEntity} from "../../entities/provider/provider.entity";
import {BaseHttpModel} from "@core-models/http/base-http.model";
import {FilterInterface} from "@core-interfaces/filter/filter.interface";
import {Observable} from "rxjs";
import {HttpResponseInterface} from "@core-models/http/http-response.interface";

export abstract class ProviderRepository implements BaseHttpModel<ProviderEntity> {

  abstract getAll(filter: FilterInterface, page?: number): Observable<HttpResponseInterface<ProviderEntity>>;

  abstract getOne(filter: FilterInterface): Observable<HttpResponseInterface<ProviderEntity>>;

  abstract create(data: ProviderEntity): Observable<ProviderEntity>;

  abstract updateOne(id: string, data: ProviderEntity): Observable<{data: ProviderEntity}>;

  abstract deleteOne(id: string): Observable<HttpResponseInterface<ProviderEntity>>;

}

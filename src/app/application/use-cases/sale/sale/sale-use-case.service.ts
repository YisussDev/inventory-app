import {Injectable} from "@angular/core";
import {
  SaleImplementation
} from "../../../../infrastructure/adapters/api/implementation/sale/sale.implementation";
import {Observable} from "rxjs";
import {HttpResponseInterface} from "@core-models/http/http-response.interface";
import {SaleEntity} from "../../../../domain/entities/sale/sale.entity";
import {FilterInterface} from "@core-interfaces/filter/filter.interface";
import {SaleRepository} from "../../../../domain/repositories/sale/sale.repository";

@Injectable()
export class SaleUseCaseService implements SaleRepository {

  constructor(
    private accountImplementation: SaleImplementation
  ) {
  }

  public getAll(filter: FilterInterface, page?: number): Observable<HttpResponseInterface<SaleEntity>> {
    return this.accountImplementation.getAll(filter, page);
  }

  public getOne(filter: FilterInterface): Observable<HttpResponseInterface<SaleEntity>> {
    return this.accountImplementation.getOne(filter);
  }

  public create(data: SaleEntity): Observable<SaleEntity> {
    return this.accountImplementation.create(data);
  }

  public updateOne(id: string, data: SaleEntity): Observable<{data: SaleEntity}> {
    return this.accountImplementation.updateOne(id, data);
  }

  public deleteOne(id: string): Observable<HttpResponseInterface<SaleEntity>> {
    return this.accountImplementation.deleteOne(id);
  }


}

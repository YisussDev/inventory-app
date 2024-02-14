import {Injectable} from "@angular/core";
import {
  ProductImplementation
} from "../../../../infrastructure/adapters/api/implementation/product/product.implementation";
import {Observable} from "rxjs";
import {HttpResponseInterface} from "@core-models/http/http-response.interface";
import {ProductEntity} from "../../../../domain/entities/product/product.entity";
import {FilterInterface} from "@core-interfaces/filter/filter.interface";
import {ProductRepository} from "../../../../domain/repositories/product/product.repository";

@Injectable()
export class ProductUseCaseService implements ProductRepository {

  constructor(
    private accountImplementation: ProductImplementation
  ) {
  }

  public getAll(filter: FilterInterface, page?: number): Observable<HttpResponseInterface<ProductEntity>> {
    return this.accountImplementation.getAll(filter, page);
  }

  public getOne(filter: FilterInterface, page?: number): Observable<HttpResponseInterface<ProductEntity>> {
    return this.accountImplementation.getAll(filter, page);
  }

  public create(data: ProductEntity): Observable<ProductEntity> {
    return this.accountImplementation.create(data);
  }

  public updateOne(id: string, data: ProductEntity): Observable<{ data: ProductEntity }> {
    return this.accountImplementation.updateOne(id, data);
  }

  public deleteOne(id: string): Observable<HttpResponseInterface<ProductEntity>> {
    return this.accountImplementation.deleteOne(id);
  }


}

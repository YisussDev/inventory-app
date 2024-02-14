import {ProductEntity} from "../../entities/product/product.entity";
import {BaseHttpModel} from "@core-models/http/base-http.model";
import {FilterInterface} from "@core-interfaces/filter/filter.interface";
import {Observable} from "rxjs";
import {HttpResponseInterface} from "@core-models/http/http-response.interface";

export abstract class ProductRepository implements BaseHttpModel<ProductEntity> {

  abstract getAll(filter: FilterInterface, page?: number): Observable<HttpResponseInterface<ProductEntity>>;

  abstract getOne(filter: FilterInterface): Observable<HttpResponseInterface<ProductEntity>>;

  abstract create(data: ProductEntity): Observable<ProductEntity>;

  abstract updateOne(id: string, data: ProductEntity): Observable<{data: ProductEntity}>;

  abstract deleteOne(id: string): Observable<HttpResponseInterface<ProductEntity>>;

}

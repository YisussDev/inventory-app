import {Injectable} from "@angular/core";
import {ProductRepository} from "../../../../../domain/repositories/product/product.repository";
import {FilterInterface} from "@core-interfaces/filter/filter.interface";
import {map, Observable} from "rxjs";
import {HttpResponseInterface} from "@core-models/http/http-response.interface";
import {ProductEntity} from "../../../../../domain/entities/product/product.entity";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import {ProductMapper} from "../../mapper/product/product.mapper";
import {ProductApiModel} from "../../models/product/product-api.model";

@Injectable()
export class ProductImplementation implements ProductRepository {

  private readonly apiUrl: string = environment.url;
  private readonly apiResource: string = environment.product_service.api_resource;
  private readonly apiList: string = environment.product_service.api_resource;

  private mapper = new ProductMapper();

  constructor(
    private _http: HttpClient
  ) {
  }

  public getAll(filter: FilterInterface, page?: number): Observable<HttpResponseInterface<ProductEntity>> {
    const headers = new HttpHeaders({
      "x-filter-model": JSON.stringify(filter)
    })
    return this._http.get<HttpResponseInterface<ProductEntity>>(`${this.apiUrl + this.apiList}?page=${page || 1}`, {headers}).pipe(
      map(response => {
        response.data.map((entityApi: ProductApiModel) => this.mapper.mapFrom(entityApi))
        return response;
      })
    );
  }

  public getOne(filter: FilterInterface): Observable<HttpResponseInterface<ProductEntity>> {
    const headers = new HttpHeaders({
      "x-filter-model": JSON.stringify(filter)
    })
    return this._http.get<HttpResponseInterface<ProductEntity>>(`${this.apiUrl + this.apiList}`, {headers}).pipe(
      map(response => {
        response.data.map((entityApi: ProductApiModel) => this.mapper.mapFrom(entityApi))
        return response;
      })
    );
  }

  public create(data: ProductEntity): Observable<ProductEntity> {
    return this._http.post<ProductEntity>(`${this.apiUrl + this.apiResource}/create`, data);
  }

  public updateOne(id: string, data: ProductEntity): Observable<{ data: ProductEntity }> {
    return this._http.patch<{ data: ProductEntity }>(`${this.apiUrl + this.apiResource}/update/${id}`, data);
  }

  public deleteOne(id: string): Observable<HttpResponseInterface<ProductEntity>> {
    return this._http.delete<HttpResponseInterface<ProductEntity>>(`${this.apiUrl + this.apiResource}/${id}`,);
  }
}

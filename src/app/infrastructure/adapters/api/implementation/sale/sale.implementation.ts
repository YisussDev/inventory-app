import {Injectable} from "@angular/core";
import {SaleRepository} from "../../../../../domain/repositories/sale/sale.repository";
import {FilterInterface} from "@core-interfaces/filter/filter.interface";
import {map, Observable} from "rxjs";
import {HttpResponseInterface} from "@core-models/http/http-response.interface";
import {SaleEntity} from "../../../../../domain/entities/sale/sale.entity";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import {SaleMapper} from "../../mapper/sale/sale.mapper";
import {SaleApiModel} from "../../models/sale/sale-api.model";

@Injectable()
export class SaleImplementation implements SaleRepository {

  private readonly apiUrl: string = environment.url;
  private readonly apiResource: string = environment.sale_service.api_resource;
  private readonly apiList: string = environment.sale_service.api_resource;

  private mapper = new SaleMapper();

  constructor(
    private _http: HttpClient
  ) {
  }

  public getAll(filter: FilterInterface, page?: number): Observable<HttpResponseInterface<SaleEntity>> {
    const headers = new HttpHeaders({
      "x-filter-model": JSON.stringify(filter)
    })
    return this._http.get<HttpResponseInterface<SaleEntity>>(`${this.apiUrl + this.apiList}?page=${page || 1}`, {headers}).pipe(
      map(response => {
        for (let saleInd in response.data) {
          // @ts-ignore
          response.data[saleInd].products = JSON.parse(response.data[saleInd].products as string);
        }
        return response;
      })
    );
  }

  public getOne(filter: FilterInterface): Observable<HttpResponseInterface<SaleEntity>> {
    const headers = new HttpHeaders({
      "x-filter-model": JSON.stringify(filter)
    })
    return this._http.get<HttpResponseInterface<SaleEntity>>(`${this.apiUrl + this.apiList}`, {headers}).pipe(
      map(response => {
        (response.data as unknown as SaleApiModel[]).map((entityApi: SaleApiModel) => this.mapper.mapFrom(entityApi))
        return response;
      })
    );
  }

  public create(data: SaleEntity): Observable<SaleEntity> {
    let newData = JSON.parse(JSON.stringify(data));
    newData = this.mapper.mapTo(newData);
    return this._http.post<SaleEntity>(`${this.apiUrl + this.apiResource}/create`, newData);
  }

  public updateOne(id: string, data: SaleEntity): Observable<{ data: SaleEntity }> {
    return this._http.patch<{ data: SaleEntity }>(`${this.apiUrl + this.apiResource}/${id}`, data);
  }

  public deleteOne(id: string): Observable<HttpResponseInterface<SaleEntity>> {
    return this._http.delete<HttpResponseInterface<SaleEntity>>(`${this.apiUrl + this.apiResource}/${id}`,);
  }
}

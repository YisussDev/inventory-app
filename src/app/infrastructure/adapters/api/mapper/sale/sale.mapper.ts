import {BaseMapperModel} from "@core-models/mapper/base-mapper.model";
import {SaleEntity} from "../../../../../domain/entities/sale/sale.entity";
import {SaleApiModel} from "../../models/sale/sale-api.model";

export class SaleMapper extends BaseMapperModel<SaleEntity, SaleApiModel> {
  public mapFrom(entityApi: SaleApiModel): SaleEntity {
    return {
      _id: entityApi._id,
      products: JSON.parse(entityApi.products),
      date_sale: entityApi.date_sale,
      total_value: entityApi.total_value,
      document_client: entityApi.document_client
    };
  }

  public mapTo(entityLocal: SaleEntity): SaleApiModel {
    return {
      _id: entityLocal._id,
      products: JSON.stringify(entityLocal.products),
      date_sale: entityLocal.date_sale,
      total_value: entityLocal.total_value,
      document_client: entityLocal.document_client
    };
  }

}

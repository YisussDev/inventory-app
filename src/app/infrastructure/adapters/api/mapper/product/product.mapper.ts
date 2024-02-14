import {BaseMapperModel} from "@core-models/mapper/base-mapper.model";
import {ProductEntity} from "../../../../../domain/entities/product/product.entity";
import {ProductApiModel} from "../../models/product/product-api.model";

export class ProductMapper extends BaseMapperModel<ProductEntity, ProductApiModel> {
  public mapFrom(entityApi: ProductApiModel): ProductEntity {
    return entityApi;
  }

  public mapTo(entityLocal: ProductEntity): ProductApiModel {
    return entityLocal;
  }

}

import {BaseMapperModel} from "@core-models/mapper/base-mapper.model";
import {ProviderEntity} from "../../../../../domain/entities/provider/provider.entity";
import {ProviderApiModel} from "../../models/provider/provider-api.model";

export class ProviderMapper extends BaseMapperModel<ProviderEntity, ProviderApiModel> {
  public mapFrom(entityApi: ProviderApiModel): ProviderEntity {
    return entityApi;
  }

  public mapTo(entityLocal: ProviderEntity): ProviderApiModel {
    return entityLocal;
  }

}

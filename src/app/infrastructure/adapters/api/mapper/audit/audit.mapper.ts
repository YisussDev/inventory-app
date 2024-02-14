import {BaseMapperModel} from "@core-models/mapper/base-mapper.model";
import {AuditEntity} from "../../../../../domain/entities/audit/audit.entity";
import {AuditApiModel} from "../../models/audit/audit-api.model";

export class AuditMapper extends BaseMapperModel<AuditEntity, AuditApiModel> {
  public mapFrom(entityApi: AuditApiModel): AuditEntity {
    return entityApi;
  }

  public mapTo(entityLocal: AuditEntity): AuditApiModel {
    return entityLocal;
  }

}

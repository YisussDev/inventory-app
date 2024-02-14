import {BaseMapperModel} from "@core-models/mapper/base-mapper.model";
import {LoginEntity} from "../../../../../domain/entities/auth/login.entity";
import {LoginApiModel} from "../../models/auth/login-api.model";

export class LoginMapper extends BaseMapperModel<LoginEntity, LoginApiModel> {
  public mapFrom(entityApi: LoginApiModel): LoginEntity {
    return entityApi;
  }

  public mapTo(entityLocal: LoginEntity): LoginApiModel {
    return entityLocal;
  }

}

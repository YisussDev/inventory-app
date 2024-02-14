import {BaseMapperModel} from "@core-models/mapper/base-mapper.model";
import {UserEntity} from "../../../../../domain/entities/user/user.entity";
import {UserApiModel} from "../../models/user/user-api.model";

export class UserMapper extends BaseMapperModel<UserEntity, UserApiModel> {
  public mapFrom(entityApi: UserApiModel): UserEntity {
    return entityApi;
  }

  public mapTo(entityLocal: UserEntity): UserApiModel {
    return entityLocal;
  }

}

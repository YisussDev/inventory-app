import {Injectable} from '@angular/core';
import {LoginEntity} from "../../domain/entities/auth/login.entity";

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

  private dataUser!: LoginEntity;

  constructor() {
  }

  public setData(data: LoginEntity): void {
    this.dataUser = data;
  }

  public getData(): LoginEntity {
    return this.dataUser;
  }

}

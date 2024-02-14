import {CanActivate, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {GlobalDataService} from "../../global/global-data.service";
import {LoginEntity} from "../../../domain/entities/auth/login.entity";

@Injectable({
  providedIn: 'root',
})
export class BackOfficeGuard implements CanActivate {

  constructor(
    private globalDataService: GlobalDataService,
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {
  }

  async canActivate(): Promise<boolean> {

    const apiUrl: string = environment.auth.uri;
    const verifyUrl: string = apiUrl + 'validate-token';
    const token = localStorage.getItem('x-token');
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });

    return await this.http.get<{
      data: LoginEntity,
      token?: string,
      isValid: boolean
    }>(verifyUrl, {headers}).toPromise().then((response) => {
      if (response) {
        if (response.isValid) {
          this.globalDataService.setData(response.data);
          localStorage.setItem('x-token', response.token || '');
          localStorage.setItem('x-user', response.data.id || '');
          return true;
        } else {
          this.router.navigate(['/auth/login']);
          return false;
        }
      } else {
        this.router.navigate(['/auth/login']);
        return true;
      }
    }).catch((error) => {
      console.log(error)
      this.router.navigate(['/auth/login']);
      return false;
    });
  }
}

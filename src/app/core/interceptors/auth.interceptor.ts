import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('x-token');
    const idUser = localStorage.getItem('x-user');

    const isLoginRequest = req.url.endsWith('/login');
    const isRegisterRequest = req.url.endsWith('/register');
    const isRecoverRequest = req.url.includes('password');

    const authReq = req.clone({
      headers: req.headers
        .set('Authorization', `Bearer ${token}`)
        .set('x-user', `${idUser}`)
        .set('x-token', `${token}`)
    });
    return next.handle(authReq);
  }
}

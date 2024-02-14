import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import {map, Observable, throwError} from 'rxjs';
import {tap, catchError} from 'rxjs/operators';
import {SpinnerService} from "../../shared/components/spinner/services/spinner.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private spinnerService: SpinnerService,
    private _router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('wss://')) {
      this.spinnerService.on();
    }

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          if (!event.url?.includes('wss://')) {
            this.spinnerService.off();
          }
        }
      }),
      catchError(error => {
        const newToken = error.headers.get('X-Token');
        if (newToken) {
          localStorage.setItem('x-token', newToken);
        }
        if (error.error.code == 401) {
          Swal.fire({
            icon: 'error',
            title: 'Sesión no válida',
            text: 'Sesión expirada o no válida.',
            confirmButtonText: 'Continuar'
          });
          localStorage.removeItem('x-token');
          this._router.navigateByUrl('/auth/login');
        }
        this.spinnerService.off();
        return throwError(error);
      })
    );
  }
}

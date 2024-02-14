import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivationEnd, Router} from "@angular/router";
import {filter, map, Observable, Subject, Subscription} from "rxjs";
import {RouteArgument} from "../../interfaces/routes/route-argument";

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  public title: string | undefined = '';
  public breadcrumbs: string[] = [];

  public sendDataRoute: Subject<{ title: string; breadcrumbs: string[] }> = new Subject<{
    title: string;
    breadcrumbs: string[]
  }>();

  private listenRouteArguments$!: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.routeParams();
  }

  public getData(): { title: string; breadcrumbs: string[] } {
    return {title: this.title || '', breadcrumbs: this.breadcrumbs}
  }

  private getRouteArguments(): Observable<RouteArgument> {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter(event => (event as ActivationEnd).snapshot.firstChild === null),
      map(event => {
        const {data, params} = (event as ActivationEnd).snapshot
        data['params'] = params;
        return data;
      })
    );
  };

  private routeParams() {
    this.listenRouteArguments$ = this.getRouteArguments()
      .subscribe({
        next: (routeArguments) => {
          if (routeArguments.breadcrumbs) {
            this.breadcrumbs = routeArguments.breadcrumbs;
            this.title = routeArguments.title;
            this.sendDataRoute.next({title: this.title || '', breadcrumbs: this.breadcrumbs})
          }
        },
        error: (err) => {
        },
        complete: () => {
        }
      })
  }

}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ModalService} from "../../modal/services/modal.service";
import {ThemeService} from "@core-services/theme/theme.service";
import {Subscription} from "rxjs";
import {RouteService} from "@core-services/routes/route.service";
import {GlobalDataService} from "../../../../core/global/global-data.service";
import {LoginEntity} from "../../../../domain/entities/auth/login.entity";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    public dataUser!: LoginEntity;
    public themeActive: boolean = true;
    public breadcrumbs: string[] = [];
    public title: string | undefined = '';
    public breadcrumbTransformed: string = '';

    private listenTheme$!: Subscription;
    private listenRouteArguments$!: Subscription;

    constructor(
        private globalDataService: GlobalDataService,
        private routeService: RouteService,
        private themeService: ThemeService,
        private modalService: ModalService,
        private _router: Router
    ) {
    }

    ngOnInit() {
        this.initDataGlobal();
        this.initListenTheme();
        this.initConfigCompany();
        this.getDataRoute();
        this.initDataUser();
    }

    private initDataUser(): void {
        this.dataUser = this.globalDataService.getData();
    }

    private initConfigCompany(): void {
    }

    private initListenTheme(): void {
        this.themeActive = this.themeService.getStatus();
        this.listenTheme$ = this.themeService.changeTheme$.subscribe(status => this.themeActive = status);
    }

    public initDataGlobal(): void {
    }

    public goToApps(): void {
        this._router.navigateByUrl('/back-office/home');
    }

    public openInfoSession(): void {
    }

    public getDataRoute(): void {
        this.title = this.routeService.getData().title;
        this.breadcrumbs = this.routeService.getData().breadcrumbs;
        this.constructBreadcrumb(this.breadcrumbs);
    }

    public constructBreadcrumb(breadcrumbs: string[]): void {
        let breadcrumbTransformed: string = breadcrumbs[0];
        for (let breadcrumb of breadcrumbs.slice(1)) {
            breadcrumbTransformed = breadcrumbTransformed + ' / ' + breadcrumb;
        }
        this.breadcrumbTransformed = breadcrumbTransformed;
    }

    ngOnDestroy() {
        this.listenTheme$.unsubscribe();
        // this.listenRouteArguments$.unsubscribe();
    }


}

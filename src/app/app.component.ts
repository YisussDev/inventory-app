import {AfterViewInit, Component} from '@angular/core';
import {Subscription} from "rxjs";
import {ThemeService} from "@core-services/theme/theme.service";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import * as moment from "moment";
import 'moment/locale/es';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {

  public themeActive: boolean = false;
  private listenTheme$!: Subscription;

  constructor(
    private title: Title,
    private themeService: ThemeService,
    private _activatedRouter: ActivatedRoute
  ) {
    moment.locale('es');
  }


  ngOnInit() {
  }

  private initListenTheme(): void {
    this.themeActive = this.themeService.getStatus();
    this.listenTheme$ = this.themeService.changeTheme$.subscribe(status => this.themeActive = status);
  }

  ngAfterViewInit() {
  }
}

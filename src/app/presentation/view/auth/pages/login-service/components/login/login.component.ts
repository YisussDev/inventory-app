import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ThemeService} from "@core-services/theme/theme.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import Swal from "sweetalert2";
import {SpinnerService} from "../../../../../../../shared/components/spinner/services/spinner.service";
import {LoginUseCaseService} from "../../../../../../../application/use-cases/auth/login/login-use-case.service";
import {GlobalDataService} from "../../../../../../../core/global/global-data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  public formLogin!: FormGroup;

  public themeActive: boolean = true;
  private listenTheme$!: Subscription;

  constructor(
    private globalDataService: GlobalDataService,
    private loginUseCaseService: LoginUseCaseService,
    private themeService: ThemeService,
    private spinnerService: SpinnerService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.initListenTheme();
  }

  ngAfterViewInit() {
  }

  private initListenTheme(): void {
    this.themeActive = this.themeService.getStatus();
    this.listenTheme$ = this.themeService.changeTheme$.subscribe(status => this.themeActive = status);
  }

  private initForm(): void {
    this.formLogin = this._formBuilder.group({
      email: ["", Validators.required],
      password: ["", [Validators.required]]
    })
  }

  public login(): void {
    if (this.formLogin.valid) {
      this.loginUseCaseService.login(this.formLogin.value).subscribe({
        next: (res) => {
          localStorage.setItem('x-token', res.token as string);
          localStorage.setItem('x-user', res.id as string);
          this.globalDataService.setData(res);
          this.spinnerService.on();
          this._router.navigateByUrl('/back-office/').then(res => this.spinnerService.off());
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: '¡Acceso Inválido!',
            text: `Credenciales Inválidas`,
            confirmButtonText: 'Ok'
          });
        },
        complete: () => {
          this.spinnerService.off();
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Faltan datos',
        text: 'Datos incompletos, por favor completarlos.',
        confirmButtonText: 'Ok'
      })
    }
  }

  ngOnDestroy() {
    this.listenTheme$.unsubscribe();
  }

}

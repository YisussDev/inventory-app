import {Component, OnDestroy, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {LoginEntity} from "../../../../../../../../domain/entities/auth/login.entity";
import {GlobalDataService} from "../../../../../../../../core/global/global-data.service";

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit, OnDestroy {

  public modules: any[] = [
    {
      name: 'users',
      rol_admits: [1]
    },
    {
      name: 'products',
      rol_admits: [1]
    },
    {
      name: 'providers',
      rol_admits: [1]
    },
    {
      name: 'audits',
      rol_admits: [1]
    },
    {
      name: 'sales',
      rol_admits: [1, 2]
    },
  ];
  public userData!: LoginEntity;

  constructor(
    private globalDataService: GlobalDataService,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.initDataUser();
  }

  private initDataUser(): void {
    this.userData = this.globalDataService.getData();
  }

  public goToModule(name_module: string): void {
    this._router.navigateByUrl(`/back-office/${name_module}`)
  }

  public logout(): void {
    // this.asideService.open();
    Swal.fire({
      icon: 'question',
      title: 'Confirmación',
      text: '¿Desea cerrar sesión?',
      confirmButtonText: 'Cerrar Sesión',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        localStorage.removeItem('data-account');
        localStorage.removeItem('x-token');
        localStorage.removeItem('x-config');
        this._router.navigateByUrl('/auth/login')
      }
    })
  }

  public validateModule(name_module: string): boolean {
    let isValid: boolean = false;
    for (const module of this.modules) {
      if ((module.name == name_module)) {
        for (let rolAdmit of module.rol_admits) {
          if (rolAdmit == this.userData.rol) {
            isValid = true
          }
        }
      }
    }
    return isValid;
  }

  ngOnDestroy() {
    // this.listenTheme$.unsubscribe();
  }
}


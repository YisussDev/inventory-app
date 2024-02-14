import {Injectable, Output} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private activate: boolean = false;
  @Output() changeTheme$: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.restoreTheme();
  }

  getStatus(): boolean {
    return this.activate;
  }

  private restoreTheme(): void {
    const status = localStorage.getItem('theme-creditapp');
    if (status) {
      this.activate = true;
      this.changeTheme$.next(this.activate);
    } else {
      this.activate = false;
      this.changeTheme$.next(this.activate);
    }
  }

  public changeTheme(): void {
    this.activate = !this.activate;
    if (this.activate) {
      localStorage.setItem('theme-creditapp', JSON.stringify(true));
      this.changeTheme$.next(this.activate);
    } else {
      localStorage.removeItem('theme-creditapp');
      this.changeTheme$.next(this.activate);
    }
  }


}

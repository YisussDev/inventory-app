import {Component, OnInit} from '@angular/core';
import {SpinnerService} from "../../services/spinner.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit{
  public isActive: boolean = false;

  constructor(
    private spinnerService: SpinnerService
  ) {
  }

  ngOnInit() {
    this.toggle();
  }

  toggle() {
    this.spinnerService.changeStatus.subscribe({
      next: (status: boolean) => {
        this.isActive = status
      }
    });
    // this.spinnerService.onlyOn.subscribe({
    //   next: () => {
    //     this.isActive = true;
    //   }
    // });
    // this.spinnerService.onlyOff.subscribe({
    //   next: () => {
    //     this.isActive = false;
    //   }
    // })
  }

  openAndClose() {
    this.isActive = true;
    setTimeout(() => {
      this.isActive = false;
    }, 1500)
  }
}

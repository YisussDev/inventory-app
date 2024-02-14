import {EventEmitter, Injectable, Output} from '@angular/core';
import {debounceTime, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  @Output() changeStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onlyOn: EventEmitter<object> = new EventEmitter();
  @Output() onlyOff: EventEmitter<object> = new EventEmitter();
  @Output() $observerOn: Subject<any> = new Subject<any>();
  @Output() $observerOff: Subject<any> = new Subject<any>();
  @Output() $observerSpinner: Subject<any> = new Subject<any>();

  constructor() {
    this.$observerOn.pipe(
      debounceTime(10)
    ).subscribe({
      next: () => {
        this.onlyOn.emit();
      }
    })
    this.$observerOff.pipe(
      debounceTime(500)
    ).subscribe({
      next: () => {
        this.onlyOff.emit();
      }
    })

    this.$observerSpinner.pipe(
      debounceTime(20)
    ).subscribe(status => {
      this.changeStatus.emit(status);
    })
  }

  activate() {
    // this.changeStatus.emit();
  }

  on() {
    // this.$observerOn.next(true);
    this.$observerSpinner.next(true);
  }

  off() {
    // this.$observerOff.next(false);
    this.$observerSpinner.next(false);
  }
}

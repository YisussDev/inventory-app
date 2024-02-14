import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {InputSchema} from "../models/input-schema";
import {InputProperties} from "../interfaces/input-properties";
import {AbstractControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ErrorsInput} from "../helpers/errors-input";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-input-check-box',
  templateUrl: './input-check-box.component.html',
  styleUrls: ['./input-check-box.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCheckBoxComponent),
      multi: true
    }
  ]
})
export class InputCheckBoxComponent extends InputSchema implements OnInit, InputProperties {


  @Input() control!: AbstractControl | null;
  @Input() label: string = '...';
  @Input() placeholder: string = '...';
  @Input() delayActive: boolean = false;
  @Input() delayTime: number = 500;
  @Input() disabledCheck: boolean = false;
  @Input() onlyCheck: boolean = false;

  @Output() $customLogicInput: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private errorsHelper: ErrorsInput
  ) {
    super();
  }


  ngOnInit(): void {
    this.useDelay();
  }

  changeValue(): void {
    if (this.value) {
      this.value = 0;
      this.applyChangeControl(this.value);
    } else {
      this.value = 1;
      this.applyChangeControl(this.value);
    }
  }

  useDelay(): void {
    if (!this.delayActive) return;
    this.delaySubscriber = this.$delaySubject.pipe(
      debounceTime(this.delayTime)
    ).subscribe({
      next: (value: any) => {
        this.$customLogicInput.emit(this.value)
      }
    })
  }

  hasError(): boolean | null {
    return this.control && this.control.invalid && (this.control.dirty || this.control.touched);
  }

  getErrorMessage(): string {
    return this.errorsHelper.calculateErrors(this.control);
  }

}

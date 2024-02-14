import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {InputSchema} from "../models/input-schema";
import {InputProperties} from "../interfaces/input-properties";
import {AbstractControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ErrorsInput} from "../helpers/errors-input";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-input-toggle',
  templateUrl: './input-toggle.component.html',
  styleUrls: ['./input-toggle.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputToggleComponent),
      multi: true
    }
  ]
})
export class InputToggleComponent extends InputSchema implements OnInit, InputProperties {


  @Input() control!: AbstractControl | null;
  @Input() label: string = '...';
  @Input() placeholder: string = '...';
  @Input() delayActive: boolean = false;
  @Input() delayTime: number = 500;
  @Input() disabledCheck: boolean = false;
  @Input() onlyToggle: boolean = false;
  @Input() icon!: string;

  @Input() override value!: 0 | 1;

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
      this.$customLogicInput.emit(this.value);
      this.applyChangeControl(this.value);
    } else {
      this.value = 1;
      this.$customLogicInput.emit(this.value);
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

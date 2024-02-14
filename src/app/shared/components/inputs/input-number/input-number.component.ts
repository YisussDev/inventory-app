import {ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {debounceTime} from "rxjs";
import {InputSchema} from "../models/input-schema";
import {InputProperties} from "../interfaces/input-properties";
import {ErrorsInput} from "../helpers/errors-input";

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true
    }
  ]
})
export class InputNumberComponent extends InputSchema implements OnInit, InputProperties {

  @Input() control!: AbstractControl | null;
  @Input() label: string = '...';
  @Input() placeholder: string = '...';
  @Input() delayActive: boolean | null = false;
  @Input() delayTime: number | null = 500;
  @Input() icon?: string | null;
  @Input() name: string = '';
  @Input() disabled: boolean = false;
  @Input() isAmount: boolean = false;

  @Output() $customLogicInput: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private errorsHelper: ErrorsInput
  ) {
    super();
  }


  ngOnInit(): void {
    this.useDelay();
  }

  changeValue(value: any): void {
    if (this.delayActive) {
      this.$delaySubject.next(value);
    } else if (!value && !this.delayActive) {
      this.applyChangeControl(null);
      this.$customLogicInput.emit(this.value);
    } else {
      this.applyChangeControl(value);
      this.$customLogicInput.emit(this.value);
    }
  }

  useDelay(): void {
    if (!this.delayActive) return;
    this.delaySubscriber = this.$delaySubject.pipe(
      debounceTime(this.delayTime || 0)
    ).subscribe({
      next: (value: any) => {
        this.applyChangeControl(value);
        this.$customLogicInput.emit(this.value);
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

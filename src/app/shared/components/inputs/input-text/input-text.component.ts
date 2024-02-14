import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {InputSchema} from "../models/input-schema";
import {InputProperties} from "../interfaces/input-properties";
import {AbstractControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ErrorsInput} from "../helpers/errors-input";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent extends InputSchema implements OnInit, InputProperties {

  @Input() control!: AbstractControl | null;
  @Input() label: string = '...';
  @Input() placeholder: string | null = '...';
  @Input() delayActive: boolean | null = false;
  @Input() delayTime: number | null = 500;
  @Input() name: string = '';

  @Input() icon?: string | null;

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

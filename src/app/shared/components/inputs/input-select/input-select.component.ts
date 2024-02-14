import {Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ErrorsInput} from "../helpers/errors-input";
import {debounceTime, Observable} from "rxjs";
import {InputSchema} from "../models/input-schema";
import {InputProperties} from "../interfaces/input-properties";

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true
    }
  ]
})
export class InputSelectComponent extends InputSchema implements OnInit, OnChanges, InputProperties {

  @Output() $customLogicInput: EventEmitter<any> = new EventEmitter<any>();

  @Input() optionsSelect: any[] | null = [];
  @Input() control!: AbstractControl | null;
  @Input() delayActive: boolean | null = false;
  @Input() delayTime: number | null = 0;
  @Input() label: string = "...";
  @Input() name: string = '';
  @Input() placeholder: string | null = "...";
  @Input() isPassword: boolean = false;
  @Input() icon?: string | null;
  @Input() disabled: boolean = false;

  @Input() keyToChangeControl: string = 'id';
  @Input() keyToShowControl: string = 'name';
  @Input() keyToShowSecondControl!: string;

  constructor(
    private errorHelper: ErrorsInput
  ) {
    super();
  }

  ngOnInit(): void {
    this.useDelay();
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  changeValue(event: any): void {
    if (this.delayActive) {
      this.$delaySubject.next(event.target.value);
    } else if (event.target.value == 'null') {
      this.applyChangeControl(null);
      this.$customLogicInput.emit(null);
    } else {
      this.applyChangeControl(event.target.value);
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
        this.$customLogicInput.emit(this.value)
      }
    })
  }

  hasError(): boolean | null {
    return this.control && this.control.invalid && (this.control.dirty || this.control.touched);
  }

  getErrorMessage(): string {
    return this.errorHelper.calculateErrors(this.control);
  }

}

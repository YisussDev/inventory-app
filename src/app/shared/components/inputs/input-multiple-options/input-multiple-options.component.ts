import {AfterViewInit, Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {InputSchema} from "../models/input-schema";
import {ConfigAutocompleteInterface, InputProperties} from "../interfaces/input-properties";
import {AbstractControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ErrorsInput} from "../helpers/errors-input";

@Component({
  selector: 'app-input-multiple-options',
  templateUrl: './input-multiple-options.component.html',
  styleUrls: ['./input-multiple-options.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMultipleOptionsComponent),
      multi: true
    }
  ]
})
export class InputMultipleOptionsComponent extends InputSchema implements OnInit, InputProperties, AfterViewInit {

  public isInputFocused: boolean = false;


  @Output() $customLogicInput: EventEmitter<any> = new EventEmitter<any>();

  @Input() control!: AbstractControl | null;
  @Input() override value: any[] = [];
  @Input() optionsData: any[] | null = [];
  @Input() delayActive: boolean = false;
  @Input() delayTime: number = 0;
  @Input() label: string = "...";
  @Input() placeholder: string = "...";
  @Input() icon?: string | null;
  @Input() keyToChangeControl: string = 'id';
  @Input() keyToShowControl: string = 'name';
  @Input() configAutocomplete!: ConfigAutocompleteInterface;
  public id!: string;

  constructor(
    private errorsHelper: ErrorsInput
  ) {
    super();
  }


  changeValue(event: any): void {
  }

  ngOnInit(): void {
    this.id = Math.round(Math.random() * 100000).toString();
  }

  ngAfterViewInit() {
    document.addEventListener('click', (e: any) => {
      const classListTarget: string = e.target.classList[e.target.classList.length - 1];
      if (!this.isInputFocused) return;
      if (!classListTarget) {
        this.isInputFocused = false;
        return;
      }
      if ((classListTarget != `option-${this.id}`)) {
        this.isInputFocused = false;
      }
    })
  }

  selectOption(option: any) {
    this.setOption(option);
  }

  setOption(option: any): void {
    let controlValues = this.value;
    const existValue = controlValues.findIndex(res => res[this.configAutocomplete['keyToChangeControl']] == option[this.configAutocomplete['keyToChangeControl']]);
    if (!(existValue == -1)) {
      controlValues = controlValues.filter((res: any) => res[this.configAutocomplete['keyToChangeControl']] !== option[this.configAutocomplete['keyToChangeControl']])
    } else {
      controlValues.push(option)
    }
    this.applyChangeControl(controlValues);
  }

  changeVisible(): void {
    this.isInputFocused = !this.isInputFocused;
  }

  isChecked(option: any): boolean {
    return !(this.value.findIndex(res => res[this.configAutocomplete['keyToChangeControl']] == option[this.configAutocomplete['keyToChangeControl']]) == -1);
  }

  hasError(): boolean | null {
    return this.control && this.control.invalid && (this.control.dirty || this.control.touched);
  }

  getErrorMessage(): string {
    return this.errorsHelper.calculateErrors(this.control);
  }
}

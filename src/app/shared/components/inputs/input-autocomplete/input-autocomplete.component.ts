import {Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {InputSchema} from "../models/input-schema";
import {debounceTime, filter, never, Subscription} from "rxjs";
import {ErrorsInput} from "../helpers/errors-input";

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputAutocompleteComponent),
      multi: true
    }
  ]
})
export class InputAutocompleteComponent extends InputSchema implements OnInit, OnChanges, ControlValueAccessor {

  public selected: any = {
    name: null,
    id: null
  };

  public isInputFocused: boolean = false;
  @Input() public dataVisible: any[] = [];
  @Input() public keyToChangeControl: string = 'id';
  @Input() public keyToShowControl: string = 'name';
  @Input() control!: AbstractControl | null;
  @Input() label: string = '...';
  @Input() placeholder: string | null = '...';
  @Input() delayActive: boolean | null = false;
  @Input() delayTime: number | null = 500;
  @Input() dataAutoComplete: any[] | null = [];
  @Input() icon?: string | null;
  @Output() $customLogicInput: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private errorsHelper: ErrorsInput
  ) {
    super();
  }


  ngOnInit(): void {
    // this.initSelected();
    this.useDelay();
    // this.listenControlChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataAutoComplete'].currentValue) {
      this.initAutocomplete();
    }
  }

  initSelected(): void {
    this.selected[this.keyToShowControl] = '';
    this.selected[this.keyToChangeControl] = null;
  }


  changeValue(value: string): void {
    if (!this.dataAutoComplete) return;
    if (value.trim().length < 2) return;
    const searchData = this.dataAutoComplete.filter(res => res[this.keyToShowControl].toLowerCase() == (value.trim().toLowerCase()));
    this.dataVisible = this.dataAutoComplete.filter(res => res[this.keyToShowControl].toLowerCase().startsWith(value.trim().toLowerCase()));
    this.selected = {
      name: value.trim(),
      id: null
    }
    this.applyChangeControl(this.selected.id);
    // if(searchData.length > 0){
    //   // this.selected = searchData[0];
    //   // this.dataVisible = [];
    //   // this.applyChangeControl(this.selected.id);
    // }
    // else {
    //   this.dataVisible = this.dataAutoComplete.filter(res => res[this.keyToShowControl].toLowerCase().startsWith(value.trim().toLowerCase()));
    //   this.selected = {
    //     name: value.trim(),
    //     id: null
    //   }
    //   this.applyChangeControl(this.selected.id);
    // }
  }


  selectOption(event: any, value: any) {
    this.selected = value;
    this.dataVisible = [];
    this.applyChangeControl(this.selected[this.keyToChangeControl]);
    this.$customLogicInput.emit(this.selected);
  }

  useDelay(): void {
    if (!this.delayActive) return;
    this.delaySubscriber = this.$delaySubject.pipe(
      debounceTime(this.delayTime || 0)
    ).subscribe({
      next: (value: any) => {
        this.$customLogicInput.emit(this.value)
      }
    })
  }

  initAutocomplete(): void {
    if (!this.dataAutoComplete) return;
    if (!this.control?.value) return;
    const existOption = this.dataAutoComplete.filter(res => res[this.keyToChangeControl] == this.control?.value);
    if (existOption) {
      this.selected = existOption[0];
    } else {
      this.selected = {};
    }
  }

  _onFocus() {
    this.isInputFocused = true;
  }

  _onBlur(event: any) {
    setTimeout(() => {
      this.isInputFocused = false;
      this._onTouch();
    }, 250)

  }

  hasError(): boolean | null {
    return this.control && this.control.invalid && (this.control.dirty || this.control.touched);
  }

  getErrorMessage(): string {
    return this.errorsHelper.calculateErrors(this.control);
  }

}


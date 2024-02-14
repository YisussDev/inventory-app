import {Subject, Subscription} from "rxjs";
import {ControlValueAccessor} from "@angular/forms";

export class InputSchema implements ControlValueAccessor {


  public value!: number | string | any | null | boolean;

  public delaySubscriber!: Subscription;
  public $delaySubject: Subject<any> = new Subject<any>();
  public touched: boolean = false;

  public _onChanged: Function = (_value: string | number) => {
  };
  public _onTouch: Function = (_value: string | number) => {
  };

  constructor() {
  }

  registerOnChange(fn: any): void {
    this._onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  touchedControl(): void{
    if(this.touched) return;
    this.touched = true;
    this._onTouch();
  }

  writeValue(value: number): void {
    if (value) {
      this.value = value;
    } else {
      this.value = null;
    }
  }

  applyChangeControl(value: any): void {
    this.value = (value);
    this._onChanged(value);
    if(this.touched) return;
    this._onTouch();
  }


}

import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button-secondary',
  templateUrl: './button-secondary.component.html',
  styleUrls: ['./button-secondary.component.css']
})
export class ButtonSecondaryComponent {

  @Output() clickEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input() label!: string;
  @Input() icon: string = '';
  @Input() data: any;

  @Input() disabled: boolean = false;

  @Input() invertIcon: boolean = false;

  eventClick(data: any):void {
    if(this.disabled) return;
    this.clickEvent.emit(data);
  }
}

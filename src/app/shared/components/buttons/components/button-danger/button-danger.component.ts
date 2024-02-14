import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button-danger',
  templateUrl: './button-danger.component.html',
  styleUrls: ['./button-danger.component.css']
})
export class ButtonDangerComponent {

  @Output() clickEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() loading!: boolean;
  @Input() label!: string;
  @Input() icon: string = '';
  @Input() data: any;
  @Input() disabled: boolean = false;
  @Input() rigthIcon: boolean = false;

  eventClick(data: any): void {
    if (this.disabled) return;
    this.clickEvent.emit(data);
  }
}

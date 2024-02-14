import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button-succes',
  templateUrl: './button-succes.component.html',
  styleUrls: ['./button-succes.component.css']
})
export class ButtonSuccesComponent {

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

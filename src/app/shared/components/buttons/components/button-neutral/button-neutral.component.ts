import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button-neutral',
  templateUrl: './button-neutral.component.html',
  styleUrls: ['./button-neutral.component.css']
})
export class ButtonNeutralComponent {
  @Output() clickEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() loading!: boolean;
  @Input() label: string = '...';
  @Input() icon: string = '';
  @Input() data: any;
  @Input() disabled: boolean = false;

  eventClick(data: any): void {
    if (this.disabled) return;
    this.clickEvent.emit(data);
  }
}

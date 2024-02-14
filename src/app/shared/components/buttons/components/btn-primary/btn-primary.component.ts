import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-btn-primary',
  templateUrl: './btn-primary.component.html',
  styleUrls: ['./btn-primary.component.css']
})
export class BtnPrimaryComponent {

  @Output() clickEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() loading!: boolean;

  @Input() label: string = '...';
  @Input() icon: string = '';
  @Input() data: any;

  @Input() disabled: boolean = false;

  eventClick(data: any):void {
    if(this.disabled) return;
    this.clickEvent.emit(data);
  }

}

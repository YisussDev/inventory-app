import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-btn-secondary',
  templateUrl: './btn-secondary.component.html',
  styleUrls: ['./btn-secondary.component.css']
})
export class BtnSecondaryComponent {

  @Output() clickEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() loading!: boolean;

  @Input() label: string = '...';
  @Input() icon!: string;
  @Input() data: any;

  @Input() disabled: boolean = false;
  @Input() fullWidth: boolean = false;

  eventClick(): void {
    if (this.disabled) return;
    this.clickEvent.emit();
  }

}

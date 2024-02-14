import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfigLabelsInterface} from "../../../interfaces/config-labels.interface";

@Component({
  selector: 'app-view-option',
  templateUrl: './view-option.component.html',
  styleUrls: ['./view-option.component.css']
})
export class ViewOptionComponent implements OnInit {

  @Input() data: any;
  @Input() configView!: ConfigLabelsInterface;
  @Input() selected: boolean = false;
  @Output() clickEvent: EventEmitter<any> = new EventEmitter<any>;

  constructor() {
  }

  ngOnInit() {
  }

  selectOption(): void {
    this.selected = !this.selected;
    this.clickEvent.emit();
  }

  generateIcon(): string {
    if (this.configView.icon == 'auto') {
      return this.data.icon;
    } else {
      return this.configView.icon
    }
  }

}

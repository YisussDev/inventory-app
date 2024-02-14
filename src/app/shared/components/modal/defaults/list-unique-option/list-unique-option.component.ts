import {Component, Input} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {ConfigLabelsInterface} from "../../interfaces/config-labels.interface";

@Component({
  selector: 'app-list-unique-option',
  templateUrl: './list-unique-option.component.html',
  styleUrls: ['./list-unique-option.component.css']
})
export class ListUniqueOptionComponent {

  @Input() data: any[] = [];
  @Input() dataGeneric!: any;
  @Input() eventName: string = '';
  @Input() configLabels!: ConfigLabelsInterface;

  constructor(
    private modalService: ModalService
  ) {
  }


  select(data: any): void {
    // this.modalService.streamingModalChanges.next('hello');
    this.modalService.closeModal({data, eventName: this.eventName, dataGeneric:this.dataGeneric})
  }

  closeModal(): void {
    this.modalService.closeModal();
  }
}

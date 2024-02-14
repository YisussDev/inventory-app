import {Component, Input} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {ConfigLabelsInterface} from "../../interfaces/config-labels.interface";

@Component({
  selector: 'app-list-multiple-option',
  templateUrl: './list-multiple-option.component.html',
  styleUrls: ['./list-multiple-option.component.css']
})
export class ListMultipleOptionComponent {
  @Input() data: any[] = [];
  @Input() dataGeneric!: any[];
  @Input() eventName: string = '';
  @Input() configLabels!: ConfigLabelsInterface;

  constructor(
    private modalService: ModalService
  ) {
  }


  select(data: any): void {
    this.updateDataGeneric(data);
    // let exist = this.dataGeneric.findIndex(res => res.key == data.key);
    // if(exist == -1){
    //   this.dataGeneric.push(data);
    // }
    // else{
    //   this.dataGeneric = this.dataGeneric.filter(res => res.key != data.key)
    // }
    this.modalService.streamingModalChanges.next({data: this.dataGeneric, eventName: this.eventName});
  }

  updateDataGeneric(data: any): void {
    let exist = this.dataGeneric.findIndex(res => res[this.configLabels.keyToControl] == data[this.configLabels.keyToControl]);
    if(exist == -1){
      this.dataGeneric.push(data);
    }
    else{
      this.dataGeneric = this.dataGeneric.filter(res => res[this.configLabels.keyToControl] != data[this.configLabels.keyToControl])
    }
  }

  setActive(option: any): boolean{
    let exist = this.dataGeneric.findIndex(res => res[this.configLabels.keyToControl] == option[this.configLabels.keyToControl]);
    return (exist != -1);
  }
  closeModal(): void {
    this.modalService.closeModal();
  }
}

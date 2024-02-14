import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {FileParentModel} from "@core-models/files/file-parent.model";
import {FileToShow} from "@core-interfaces/files/file.interface";

@Component({
  selector: 'app-show-document',
  templateUrl: './show-document.component.html',
  styleUrls: ['./show-document.component.css']
})
export class ShowDocumentComponent extends FileParentModel implements OnInit, AfterViewInit {

  @Input() public override data: FileToShow[] = [];
  @Input() public dataTest: any;

  constructor(
    private modalService: ModalService
  ) {
    super();
  }

  ngOnInit() {
  }

  closeModal(): void {
    this.modalService.closeModal();
  }

  ngAfterViewInit() {
    this.initContainer('container-files');
  }

}

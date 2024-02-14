import {Subject, Subscription} from "rxjs";
import {ModalService} from "../services/modal.service";

export class ModalParent {

  private listenModalFinish$!: Subscription;

  constructor(
    private modalService: ModalService
  ) {
  }

  listenStream(): Subject<any> {
    return this.modalService.streamingModalChanges;
  }

  listenFinish(): Subject<any>{
    return this.modalService.finishModal
  }
}

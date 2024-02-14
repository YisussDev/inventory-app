import {FileToShow} from "@core-interfaces/files/file.interface";

export class FileParentModel {

  public data: FileToShow[] = [];
  public fileSelected: number = 0;
  public optionSelected: number = 0;

  public containerFiles!: any;

  public baseWidth: number = 612;
  public baseHeight: number = 792;

  private widthChange: number = 1100;

  public scale: number = 1;

  public initContainer(id: string): void {
    this.containerFiles = document.getElementById(id);
    if (window.innerWidth >= this.widthChange) {
      this.scale = 1;
    } else if (window.innerWidth < this.widthChange) {
      this.scale = 0.5;
    }
  }

  public dictionarieZoom: any = {
    0.5: '50%',
    1: '100%',
    1.5: '150%'
  }

  public afterDocument(): void {
    if ((this.fileSelected == (this.data.length - 1))) return;
    this.data.map(res => res.page_actual = 1);
    this.fileSelected += 1;
    this.initContainer('container-file');
  }

  public beforeDocument(): void {
    if (!(this.fileSelected > 0)) return;
    this.data.map(res => res.page_actual = 1);
    this.fileSelected -= 1;
    this.initContainer('container-file');
  }

  public changePage(page: number): void {
    this.data[this.fileSelected].page_actual = page;
  }

  public prevPage(): void {
    if (this.data[this.fileSelected].page_actual == 1) return;
    this.data[this.fileSelected].page_actual -= 1;
  }

  public nextPage(): void {
    if (this.data[this.fileSelected].total_pages == this.data[this.fileSelected].page_actual) return;
    this.data[this.fileSelected].page_actual += 1;
  }

  public afterLoadPdf(event: any): void {
    this.data[this.fileSelected].total_pages = event._transport._numPages;
    this.data[this.fileSelected].pages_index = event._transport.pageCache;
  }

  public updateZoomContainer(scale: number): void {
    if (this.containerFiles) {
      this.containerFiles.style.width = (this.baseWidth * scale) + "px";
      this.containerFiles.style.minWidth = (this.baseWidth * scale) + "px";
      this.containerFiles.style.maxWidth = (this.baseWidth * scale) + "px";
      this.containerFiles.style.height = (this.baseHeight * scale) + "px";
      this.containerFiles.style.minHeight = (this.baseHeight * scale) + "px";
      this.containerFiles.style.maxHeight = (this.baseHeight * scale) + "px";
    }
  }

  public zoomPlus(): void {
    this.containerFiles = document.getElementById('container-files');
    if (this.scale == 1.5) return;
    this.scale = this.scale + 0.5;
    if (this.containerFiles) this.updateZoomContainer(this.scale);
  }

  public zoomMinus(): void {
    this.containerFiles = document.getElementById('container-files');
    if (this.scale == 0.5) return;
    this.scale = this.scale - 0.5;
    if (this.containerFiles) this.updateZoomContainer(this.scale);
  }


}

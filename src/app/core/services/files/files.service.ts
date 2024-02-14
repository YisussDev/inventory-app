import {Injectable} from '@angular/core';
import {SpinnerService} from "../../../shared/components/spinner/services/spinner.service";
import {FileInterface, FileToShow} from "@core-interfaces/files/file.interface";
import {UUID} from "angular2-uuid";
import Compressor from 'compressorjs';


@Injectable({
  providedIn: "root"
})
export class FilesService {

  constructor(
    private spinnerService: SpinnerService
  ) {
  }

  public async convertToBase644(file: File, limit: number = 1): Promise<FileInterface> {
    return new Promise((resolve, reject) => {
      if (file.size > limit * 1024 * 1024) {
        reject({message: `Tamaño de archivo excede el límite de ${limit}MB`, file: file.name});
      } else {
        this.spinnerService.on();
        const reader = new FileReader();
        reader.onload = (e) => {
          // @ts-ignore
          const base64 = e.target?.result?.split(',')[1];
          setTimeout(() => {
            this.spinnerService.off();
          }, 500)
          resolve(
            {
              filename: file.name,
              reference: base64,
              type: 'base64',
              id: UUID.UUID(),
              size: file.size * 1.4,
              ext: file.name.slice(-3)
            }
          );
        };
        reader.onerror = (error) => {
          setTimeout(() => {
            this.spinnerService.off();
          }, 500)
          reject({message: error, file: file.name});
        };
        reader.readAsDataURL(file);
      }
    });
  }

  public async convertToBase64(file: File, limit: number = 1): Promise<FileInterface> {
    if(file.name.slice(-3) == 'pdf'){
      return new Promise((resolve, reject) => {
        if (file.size > limit * 1024 * 1024) {
          reject({message: `Tamaño de archivo excede el límite de ${limit}MB`, file: file.name});
        } else {
          this.spinnerService.on();
          const reader = new FileReader();
          reader.onload = (e) => {
            // @ts-ignore
            const base64 = e.target?.result?.split(',')[1];
            setTimeout(() => {
              this.spinnerService.off();
            }, 500)
            resolve(
              {
                filename: file.name,
                reference: base64,
                type: 'base64',
                id: UUID.UUID(),
                size: file.size * 1.4,
                ext: file.name.slice(-3)
              }
            );
          };
          reader.onerror = (error) => {
            setTimeout(() => {
              this.spinnerService.off();
            }, 500)
            reject({message: error, file: file.name});
          };
          reader.readAsDataURL(file);
        }
      });
    }
    else{
      return new Promise((resolve, reject) => {
        if (file.size > limit * 1024 * 1024) {
          reject({message: `Tamaño de archivo excede el límite de ${limit}MB`, file: file.name});
        } else {
          // this.spinnerService.on();
          new Compressor(file, {
            quality: 0.4,
            // maxWidth: 800,
            // maxHeight: 600,
            success(result) {
              const reader = new FileReader();
              reader.onload = (e) => {
                // @ts-ignore
                const base64 = e.target?.result?.split(',')[1];
                setTimeout(() => {
                  // this.spinnerService.off();
                }, 500);
                resolve({
                  filename: file.name,
                  reference: base64,
                  type: 'base64',
                  id: UUID.UUID(),
                  size: result.size || file.size, // Usar el tamaño de la imagen comprimida si está disponible
                  ext: file.name.slice(-3),
                });
              };
              reader.onerror = (error) => {
                setTimeout(() => {
                  // this.spinnerService.off();
                }, 500);
                reject({message: error, file: file.name});
              };
              reader.readAsDataURL(result);
            },
            error(err) {
              setTimeout(() => {
                // this.spinnerService.off();
              }, 500);
              reject({message: err.message, file: file.name});
            },
          });
        }
      });
    }
  }

  public deleteFile(files: FileInterface[], id: string): FileInterface[] {
    return files.filter(res => res.id != id);
  }

  public generateFileToShow(file: FileInterface): FileToShow {
    if (file.ext == 'pdf') {
      return ({
        id: file.id || '',
        type: file.type,
        reference: file.reference,
        filename: file.filename,
        ext: file.ext,
        src: {
          data: atob(file.reference)
        },
        page_actual: 1,
        pages_index: [],
        total_pages: 1
      })
    } else {
      return ({
        id: file.id || '',
        type: file.type,
        reference: file.reference,
        filename: file.filename,
        ext: file.ext,
        src: file.reference,
        page_actual: 1,
        pages_index: [],
        total_pages: 1
      })
    }
  }

  public downloadFile(file: FileInterface): void {
    if (file.ext == 'pdf') {
      const binaryString = atob(file.reference);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], {type: 'application/pdf'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = file.filename;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const binaryString = atob(file.reference);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], {type: file.ext});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = file.filename;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    }
  }

}

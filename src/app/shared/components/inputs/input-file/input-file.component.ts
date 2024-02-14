import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ChangeDetectorRef, OnChanges, SimpleChanges
} from '@angular/core';
import {AbstractControl, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {InputSchema} from "../models/input-schema";
import {InputProperties} from "../interfaces/input-properties";
import {ErrorsInput} from "../helpers/errors-input";
import Swal from "sweetalert2";
import {FilesService} from "@core-services/files/files.service";

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFileComponent),
      multi: true
    }
  ],
})
export class InputFileComponent extends InputSchema implements OnInit, OnChanges, InputProperties {
  @Input() control!: AbstractControl | FormControl | null;
  @Input() label: string = '...';
  @Input() placeholder: string = '...';
  @Input() delayActive: boolean | null = false;
  @Input() delayTime: number | null = 500;
  @Input() icon?: string | null;
  @Input() name: string = '';
  @Input() sizeMax: number = 5;
  @Input() file!: string;

  @Output() $customLogicInput: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private filesService: FilesService,
    private errorsHelper: ErrorsInput,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }


  ngOnInit(): void {
    this.useDelay();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      if (changes['control']) {
      }
    }
  }

  public async loadFiles(event: any): Promise<void> {
    try {
      let files: File[] = event.target.files;
      for (let file of files) {
        await this.filesService.convertToBase64(file, this.sizeMax)
          .then(fileConverted => {
            this.applyChangeControl(fileConverted);
            Swal.fire({
              icon: 'success',
              title: 'Cargue Exitoso',
              text: `Archivo cargado exitosamente.`,
              confirmButtonText: 'Ok'
            });
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              title: '¡Ops!',
              text: error.message,
              confirmButtonText: 'Continuar'
            });
          });
      }
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: '¡Ops!',
        text: `Archivo ${err.file} no se pudo cargar.`,
        confirmButtonText: 'Ok'
      })
    }
  }

  public loadDocument(event: any): void {
    if (this.validateSize(event.target.files[0].size)) {
      const archive = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.applyChangeControl({
          file: e.target.result.split(',')[1],
          ext: event.target.files[0].type.slice(-3),
          name: event.target.files[0].name
        });
      }
      reader.readAsDataURL(archive);
    } else {
      this.resetDocument(event);
      Swal.fire({
        icon: 'warning',
        title: '¡Error!',
        text: 'Archivo excede peso máximo',
        confirmButtonText: 'Ok'
      })
    }
  }

  public resetDocument(event: any): void {
    event.target.value = '';
    this.applyChangeControl(null);
  }

  public useDelay() {
  }

  changeValue(value: any): void {
    if (this.delayActive) {
      this.$delaySubject.next(value);
    } else if (!value && !this.delayActive) {
      this.applyChangeControl(null);
      this.$customLogicInput.emit(this.value);
    } else {
      this.applyChangeControl(value);
      this.$customLogicInput.emit(this.value);
    }
  }

  validateSize(size: number): boolean {
    return size < (this.sizeMax * 1024)
  }

  hasError(): boolean | null {
    return this.control && this.control.invalid && (this.control.dirty || this.control.touched);
  }

  getErrorMessage(): string {
    return this.errorsHelper.calculateErrors(this.control);
  }
}

import {Component, OnInit} from '@angular/core';
import {ProductEntity} from "../../../../../../../../domain/entities/product/product.entity";
import {
  ProductUseCaseService
} from "../../../../../../../../application/use-cases/product/product/product-use-case.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SaleUseCaseService} from "../../../../../../../../application/use-cases/sale/sale/sale-use-case.service";
import {FilterInterface} from "@core-interfaces/filter/filter.interface";
import * as moment from "moment";
import {Subscription} from "rxjs";
import Swal from "sweetalert2";
import {UUID} from "angular2-uuid";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sales-create',
  templateUrl: './sales-create.component.html',
  styleUrls: ['./sales-create.component.css']
})
export class SalesCreateComponent implements OnInit {

  public products: ProductEntity[] = [];

  public formSale!: FormGroup;
  public formItem!: FormGroup;

  private listenChangesItemQuantity$!: Subscription;
  private listenChangesItemId$!: Subscription;
  private listenChangesSaleProduct$!: Subscription;

  constructor(
    private productUseCaseService: ProductUseCaseService,
    private saleUseCaseService: SaleUseCaseService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.initProducts();
    this.initListenFormItems();
    this.initListenFormSale();
  }

  private initForm(): void {
    this.formSale = this._formBuilder.group({
      _id: [UUID.UUID()],
      document_client: ["", Validators.required],
      products: [[], Validators.required],
      total_value: [0, Validators.required],
      date_sale: [moment().format("L"), Validators.required],
    });

    this.formItem = this._formBuilder.group({
      _id: ["", Validators.required],
      name: [""],
      quantity: ["", [Validators.required, Validators.min(0)]],
      total: ["", Validators.required],
    })
  }

  private initProducts(): void {
    const filter: FilterInterface = {}

    this.productUseCaseService.getAll(filter, 1).subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: () => {

      }
    })
  }

  private initListenFormItems(): void {
    const {_id, quantity, total} = this.formItem.controls;
    this.listenChangesItemQuantity$ = quantity.valueChanges.subscribe(valueControl => {
      if (valueControl && _id.value) {
        const productSelected: ProductEntity = this.products.filter(product => product._id == _id.value)[0];
        total.setValue(Number(productSelected.price) * quantity.value)

      } else {
        total.setValue(0);
      }
    });
    this.listenChangesItemId$ = _id.valueChanges.subscribe(valueControl => {
      if (valueControl && quantity.value) {
        const productSelected: ProductEntity = this.products.filter(product => product._id == _id.value)[0];
        total.setValue(Number(productSelected.price) * quantity.value)
      } else {
        total.setValue(0);
      }
    });
  }

  private initListenFormSale(): void {
    const {products, total_value} = this.formSale.controls;
    this.listenChangesSaleProduct$ = products.valueChanges.subscribe(valueControl => {
      if (valueControl.length > 0) {
        let total: number = 0;
        for (let product of valueControl) {
          total = Number(product.total) + total;
        }
        total_value.setValue(total);
      } else {
        total_value.setValue(0);
      }
    })
  }

  public addProduct(): void {
    const {name, _id, quantity, total} = this.formItem.controls;
    const {products,} = this.formSale.controls;
    const productSelected: ProductEntity = this.products.filter(product => product._id == _id.value)[0];
    const productIndexSelected: number = this.products.findIndex(product => product._id == _id.value);
    name.setValue(productSelected.name);
    if (this.formItem.valid) {
      if (this.validateProductQuantity(_id.value, quantity.value)) {
        const indexProduct: number = products.value.findIndex((product: any) => product._id == _id.value);
        if (indexProduct == -1) {
          products.setValue([...products.value, this.formItem.value]);
        } else if (indexProduct != -1) {
          products.value[indexProduct].quantity = products.value[indexProduct].quantity + quantity.value;
        }
        this.products[productIndexSelected].quantity = this.products[productIndexSelected].quantity - Number(quantity.value);
        this.formItem.reset();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No Stock',
          text: 'No existe tanto stock.',
          confirmButtonText: 'Ok'
        })
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Valores inválido',
        text: 'Verifique sus datos.',
        confirmButtonText: 'Ok'
      })
    }
  }

  public removeProduct(productToRemove: ProductEntity): void {
    Swal.fire({
      icon: 'question',
      title: 'Confirmación',
      text: `¿Está seguro de retirar ${productToRemove.name}?`,
      confirmButtonText: 'Sí',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        const productInd: number = this.products.findIndex(product => product._id == productToRemove._id);
        this.products[productInd].quantity = Number(this.products[productInd].quantity) + Number(productToRemove.quantity);
        this.formSale.controls['products'].setValue(this.formSale.controls['products'].value.filter((product: any) => product._id != productToRemove._id));
      }
    })
  }

  private validateProductQuantity(idProduct: string, quantity: number): boolean {
    const productSelected: ProductEntity = this.products.filter(product => product._id == idProduct)[0];
    return (quantity <= Number(productSelected.quantity));
  }

  public createSale(): void {
    if (this.formSale.valid) {
      console.log(this.formSale.value)
      this.saleUseCaseService.create(this.formSale.value).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Proceso Exitoso',
            text: 'Venta exitosa.',
            confirmButtonText: 'Ok'
          });
          this._router.navigateByUrl('/back-office/apps')
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Proceso Erroneo',
            text: 'Vuelve a intentarlo por favor.',
            confirmButtonText: 'Ok'
          });
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Venta Inválida',
        text: 'Compruebe sus datos.',
        confirmButtonText: 'Ok'
      })
    }
  }

}

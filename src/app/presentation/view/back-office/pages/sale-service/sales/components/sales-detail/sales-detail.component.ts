import {Component, OnInit} from '@angular/core';
import {SaleEntity} from "../../../../../../../../domain/entities/sale/sale.entity";
import {SaleUseCaseService} from "../../../../../../../../application/use-cases/sale/sale/sale-use-case.service";
import {FilterInterface} from "@core-interfaces/filter/filter.interface";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-sales-detail',
  templateUrl: './sales-detail.component.html',
  styleUrls: ['./sales-detail.component.css']
})
export class SalesDetailComponent implements OnInit {

  public sale!: SaleEntity;
  private saleId!: string;

  constructor(
    private saleUseCaseService: SaleUseCaseService,
    private _activatedRouter: ActivatedRoute,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.extractIdSale();
    this.initSale();
  }

  private extractIdSale(): void {
    const {id} = this._activatedRouter.snapshot.params;
    this.saleId = id;
  }

  private initSale(): void {
    const filter: FilterInterface = {
      orSingleQueries: [["_id", "=", `%${this.saleId}%`]]
    }
    this.saleUseCaseService.getAll(filter, 1).subscribe({
      next: (res) => {
        console.log(res)
        this.sale = res.data[0];
      },
      error: () => {

      }
    })
  }

}

import {ProductEntity} from "../product/product.entity";

export interface SaleEntity {
  _id: string;
  document_client: string;
  products: ProductEntity[];
  total_value: number;
  date_sale: string;
}

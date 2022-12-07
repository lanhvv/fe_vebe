import {BaseResponse} from "../BaseResponse";
import {ImportProductResult} from "../../result/product/ImportProductResult";

export class ImportWarehouseResponse extends BaseResponse{
  supplierCode!: number;
  products!: ImportProductResult[];
}

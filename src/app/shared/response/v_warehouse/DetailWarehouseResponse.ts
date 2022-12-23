import {BaseResponse} from "../BaseResponse";
import {GetExportItems} from "../../item/GetExportItems";

export class DetailWarehouseResponse extends BaseResponse{
  supplierName!: string;
  expireDate!: string;
  productCode!: string;
  inPrice!: number;
  outPrice!: number;
  inAmount!: number;
  outAmount!: number;
  unitName!: string;
  exportItems!: GetExportItems[];
}

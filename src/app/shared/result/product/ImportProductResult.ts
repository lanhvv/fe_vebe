import {ExportResult} from "../v_export/ExportResult";
import {GetTypeProductResult} from "../v_type_product/GetTypeProductResult";
import {GetUnitResult} from "../v_unit/GetUnitResult";

export class ImportProductResult{
  id!: number;
  productId!: string;
  productName!: string;
  qrCode!: string;
  inAmount!: number;
  type!: string;
  image!: string;
  description!: string;
  status!: number;
  supplierId!: number;
  img!: string;
  inPrice!: number;
  typeProduct!: GetTypeProductResult;
  barcode!: string;
  productCode!: string;
  unit!: GetUnitResult;
  units!: GetUnitResult[];
  exports!:ExportResult[];
  creator!: string;
  rangeDates!: string;
}

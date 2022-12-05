import {ExportResult} from "../v_export/ExportResult";

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
  typeProduct!: number;
  barCode!: string;
  productCode!: string;
  unitId!: number;
  export!:ExportResult[];
  creator!: string;
  rangeDate!: string;
}

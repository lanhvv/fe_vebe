import { Unit } from '../Unit';
export class ImportInWarehouseInRedis {
  id!: string;
  productId!: number;
  image!: string;
  img!: number
  productName!: string;
  barcode!: string;
  inPrice!: number;
  typeProductId!: number;
  inAmount!: number;
  unitId!: number;
  qrCode!: string;
  supplierId!: number;
  supplierName!: string;
  creator!: string;
  rangeDate!: Date;
  description!: string;
  exportsItems: Unit[]=[];
  unit!: string
}

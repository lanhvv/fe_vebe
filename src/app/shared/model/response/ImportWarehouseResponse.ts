import { BaseResponse } from 'src/app/shared/response/BaseResponse';
export class ImportWarehouseResponse {
      importId!: number ;
      productCode!: string;
      qrCode!: string;
      unitName!: string;
      amount!: number;
      inPrice!: number;
      rangeDate!: Date;
      productName!: string;
}

import { BaseResponse } from 'src/app/shared/response/BaseResponse';
export class ImportWarehouseResponse extends BaseResponse {
      importId!: number ;
      productCode!: string;
      qrCode!: string;
      unitName!: string;
      amount!: number;
      inPrice!: number;
      rangeDate!: Date;
      productName!: string;
}

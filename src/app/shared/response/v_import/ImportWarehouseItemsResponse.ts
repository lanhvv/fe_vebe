import {BaseResponse} from "../BaseResponse";

export class ImportWarehouseItemsResponse extends BaseResponse{
  importId!:number
   productCode!:String
   qrCode!:String
   unitName!:String
   amount!:number
   inPrice!:number
   rangeDate!:String
}

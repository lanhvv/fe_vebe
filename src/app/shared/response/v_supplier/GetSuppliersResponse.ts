import {BaseResponse} from "../BaseResponse";
import {GetSupplierResult} from "../../result/v_supplier/GetSupplierResult";

export class GetSuppliersResponse extends BaseResponse{
  suppliers!: GetSupplierResult[];
}

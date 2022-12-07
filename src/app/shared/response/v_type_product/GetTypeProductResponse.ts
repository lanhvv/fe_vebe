import {BaseResponse} from "../BaseResponse";
import {GetTypeProductResult} from "../../result/v_type_product/GetTypeProductResult";

export class GetTypeProductResponse extends BaseResponse{
  results!: GetTypeProductResult[];
}

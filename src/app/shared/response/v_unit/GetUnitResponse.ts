import {BaseResponse} from "../BaseResponse";
import {GetUnitResult} from "../../result/v_unit/GetUnitResult";

export class GetUnitResponse extends BaseResponse{
  results!: GetUnitResult[];
}

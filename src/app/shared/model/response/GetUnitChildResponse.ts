import { InfoUnitItem } from "../InfoUnitItem";
import { BaseResponse } from "./BaseResponse";

export class GetUnitChildResponse extends BaseResponse{
     unitItems!:InfoUnitItem[];
}
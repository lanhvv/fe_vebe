import {BaseResponse} from "../BaseResponse";
import {ExportResult} from "../../result/v_export/ExportResult";

export class GetExportsByUnitSelectResponse extends BaseResponse{
  results!: ExportResult[];
}

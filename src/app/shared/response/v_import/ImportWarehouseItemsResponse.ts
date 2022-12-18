import {BaseResponse} from "../BaseResponse";
import {ImportWarehouseItems} from "../../item/v_import/ImportWarehouseItems";

export class ImportWarehouseItemsResponse extends BaseResponse {
  items!: ImportWarehouseItems[];
}

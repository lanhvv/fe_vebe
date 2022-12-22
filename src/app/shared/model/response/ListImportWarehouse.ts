import { ImportWarehouseResponse } from "./ImportWarehouseResponse";
import {BaseResponse} from "../../response/BaseResponse";

export class ListImportWarehouse extends BaseResponse{
    items: ImportWarehouseResponse[]=[]
}

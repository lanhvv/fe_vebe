import { BaseResponse } from './../../response/BaseResponse';
import { ImportWarehouseResponse } from "./ImportWarehouseResponse";

export class ListImportWarehouse extends BaseResponse{
    items: ImportWarehouseResponse[]=[]
}

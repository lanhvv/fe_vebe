import { ImportWarehouseResponse } from "./ImportWarehouseResponse";
import { BaseResponse } from '../../../../../../../../Vibee/Vibee/src/app/shared/model/response/BaseResponse';

export class ListImportWarehouse extends BaseResponse{
    items: ImportWarehouseResponse[]=[]
}

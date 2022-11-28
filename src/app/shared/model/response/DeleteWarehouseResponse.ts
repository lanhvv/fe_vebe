import { BaseResponse } from "./BaseResponse";

export class DeleteWarehouseResponse extends BaseResponse{
    warehouseId!: number;
    statusName!: string;
    statusCode!: number;
}
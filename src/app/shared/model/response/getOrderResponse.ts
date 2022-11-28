import { Filter } from '../Filter';
import { IManagerOrder } from '../orderItems';
import { BaseResponse } from './BaseResponse';
export class GetOrderResponse extends BaseResponse{
    items!:IManagerOrder[];
    totalItems!:number;
    totalPages!:number;
    page!:number;
    pageSize!:number;
    filter!:Filter;
}


// import { IManagerOrder } from '../model/orderItems';
import { Filter } from '../model/Filter';
export interface GetAllOrder {
    // items?:IManagerOrder[];
    totalItems?:number;
    totalPages?:number;
    page?:number;
    pageSize?:number;
    filter?:Filter;
}

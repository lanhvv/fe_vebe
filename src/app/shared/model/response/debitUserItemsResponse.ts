import { Filter } from './../Filter';
import { DebitUserItems } from '../debitUserItems';
import { BaseResponse } from './BaseResponse';
export class DebitUserItemsResponse extends BaseResponse{
    items!: DebitUserItems[]
    totalItems!:number;
    totalPages!:number;
    page!:number;
    pageSize!:number;
    filter!:Filter;
}

import { BaseResponse } from './../../response/BaseResponse';
import { Filter } from './../Filter';
import { IDebitItems } from './../iDebitIitems';
export class DebitItemsResponse extends BaseResponse {
  items!: IDebitItems[]
  totalItems!:number;
  totalPages!:number;
  page!:number;
  pageSize!:number;
  filter!:Filter;
}

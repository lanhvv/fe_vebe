import { Filter } from '../Filter';
export class GetOrderRequest {
    page!:number;
    pageSize!:number;
    filter!:Filter;
    language!:string;
    searchText!:string;
}

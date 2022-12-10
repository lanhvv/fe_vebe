import { Filter } from "../Filter";

export class GetProductsRequest{
    page!:number;
    pageSize!:number;
    filter!:Filter;
    language!:string;
    searchText!:string;
}
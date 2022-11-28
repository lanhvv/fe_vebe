import { AccountItems } from '../AccountItems';
export class GetAccountItemsResponse {
    items!:AccountItems[];
    totalItems!:number;
    totalPages!:number;
    page!:number;
    pageSize!:number;
    countStatus!: number;
}

import {Status} from "../Status";
import {AccountCustomerItem} from "../AccountCustomerItem";

export class ResponseAccountCustomer {
  status !: Status;
  customers !: AccountCustomerItem[];
  totalItems !: number;
  totalPages !: number;
  // page !: number;
  // pageSize !: number;
}

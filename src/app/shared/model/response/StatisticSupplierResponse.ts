import {Status} from "../Status";
import {StatisticSupplierItem} from "../StatisticSupplierItem";

export class StatisticSupplierResponse {
  status ?: Status;
  list !: StatisticSupplierItem[];
  page ?: number;
  pageSize ?: number;
  totalItems !: number;
  totalPage ?: number;
}

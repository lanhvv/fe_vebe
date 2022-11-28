import {Status} from "../Status";
import {StatisticStaff} from "../statistic-staff";

export class ResponseStatisticStaff {
  status!:Status;
  list!:StatisticStaff[];
  totalItems !: number;
  totalPages !: number;
  page !: number;
  pageSize !: number;
}

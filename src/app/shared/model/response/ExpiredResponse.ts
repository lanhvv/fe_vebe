import {Status} from "../Status";
import CloseToExpirationItem from "../CloseToExpirationItem";
import ExpiratedItem from "../ExpiratedItem";

export class ExpiredResponse{
  status !: Status;
  list !: ExpiratedItem[];

  totalItems !: number;
  totalPages !: number;
  page !: number;
  pageSize !: number;
}

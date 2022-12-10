import {Status} from "../Status";
import {UnitItems} from "../UnitItems";

export class ResponseUnit{
  status !: Status;
  totalItems !: number;
  totalPages !: number;
  page !: number;
  pageSize !: number;
  list !: UnitItems[];
}

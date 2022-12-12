import {Status} from "../Status";
import {Supplier} from "../supplier.model";

export class SupplierResponse {
  status !: Status;
  supplierItems !: Supplier[];
  totalItems !: number;
  totalPages !: number;
  supplierActive !: number;
}

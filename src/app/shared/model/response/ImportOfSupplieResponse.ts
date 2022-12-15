import {ImportOfSupplierItem} from "../ImportOfSupplierItem";
import {Status} from "../Status";

export class ImportOfSupplieResponse {
  importsOfSupplier !: ImportOfSupplierItem[] ;
  status !: Status;

  page !: number;
  pageSize !: number;
  totalItems !: number;
  totalPages !: number;
}

import {ImportOfSupplierItem} from "../ImportOfSupplierItem";
import {Status} from "../Status";

export class ImportOfSupplieResponse {
  importsOfSupplier !: ImportOfSupplierItem[] ;
  lineChart !: number[];
  status !: Status;
  supplier !: string;
  page !: number;
  pageSize !: number;
  totalItems !: number;
  totalPages !: number;
  productName !: string[];
  totalOfEntries !: number;
  totalOfPays!: number;
}

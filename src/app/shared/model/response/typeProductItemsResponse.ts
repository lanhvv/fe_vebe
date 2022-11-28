import {MegaMenuDTO} from "../megaMenuDTO";
import {Filter} from "../Filter";

export class TypeProductItemsResponse {
  data!: MegaMenuDTO[]
  totalItems!:number;
  totalPages!:number;
  page!:number;
  pageSize!:number;
  filter!:Filter;
}

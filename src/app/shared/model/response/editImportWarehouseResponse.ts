import { Unit } from '../Unit';
import { Units } from '../Units';
export class EditImportWarehouseResponse {
  id!: string
  nameProd!:string;
  unit!:string;
  description!:string;
  categoryId!:number;
  supplierId!:number;
  barCode!:string;
  amount!:number;
  inPrice!:number;
  units:Units[]=[];
  unitId!:number;
  fileId!:number;
  rangeDates!: string;
  supplierName!: string;
  categoryName!: string
  amountUnit!: number;
  descriptionUnit!: string;
  nameUploadFile!: string;
  urlUpload!: string;
}

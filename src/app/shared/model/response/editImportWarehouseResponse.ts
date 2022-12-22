import { Unit } from '../Unit';
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
  units:Unit[]=[];
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

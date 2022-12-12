import { SelectionTypeProductItems } from '../../../../../../../../Vibee_fe/Vibee_fe/src/app/shared/model/selectionTypeProductItems';
export class ShowProductByBarcodeResponse {
  id!: number;
  productName!: string;
  barCode!: string;
  description!: string;
  fileId!: number;
  creator!: string;
  supplierName!: string;
  category!:SelectionTypeProductItems 

}

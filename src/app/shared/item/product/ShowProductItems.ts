import { GetUnit } from './getUnit';
export class ShowProductItems {
    id!: number;
    productName!: string;
    barcode!: string;
    qrCode!: string;
    amount!: number;
    expired!: Date;
    img!: string;
    price!: number;
    description!: string;
    supplierName!:string
    importID!: number
    files!: number
    fileImport!: number;
    unit: GetUnit[]=[]
}

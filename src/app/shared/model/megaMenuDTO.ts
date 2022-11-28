import { TypeProductItems } from './typeProductItems';
export class MegaMenuDTO {
    data!: TypeProductItems ;
    children!: MegaMenuDTO[] ;
}

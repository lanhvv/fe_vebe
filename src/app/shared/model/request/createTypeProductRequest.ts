import {BaseRequest} from "./BaseRequest";

export class CreateTypeProductRequest extends BaseRequest{
  name!: number;
  description!: string;
  parentId!: number;

}

export class UnitItems{
  id !: number;
  unitName !: string;
  createdDate !: Date;
  creator !: string;
  parent !: number;
  description !: string;
  amount !: number;
  list !: UnitItems[];
}

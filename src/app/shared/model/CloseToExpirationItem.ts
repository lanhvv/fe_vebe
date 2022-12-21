export class CloseToExpirationItem{
  idImport !: number;
  nameProduct !: string;
  amount !: number;
  dateAdded !: Date;
  expired !: Date;
  inCome !: number;
  creator !: string;
  list !: Uitem[];
}

class Uitem {
  nameUnit !: string;
  amount !: number;
  idUnit !: number;
  idExport !: number;
}

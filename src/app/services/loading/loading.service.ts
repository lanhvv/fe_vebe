import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public loading$: Subject<boolean> = new Subject<boolean>();

  public setLoading(value: boolean) {
    this.loading$.next(value);
  }
}

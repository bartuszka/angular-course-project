import { Observable, Subject } from "rxjs";

export interface AppErorr {
  code: number;
  message: string;
}

export class ErrorService {
  private errorSubject$: Subject<AppErorr> = new Subject();
  public error$: Observable<AppErorr> = this.errorSubject$.asObservable();

  public addError(error: AppErorr): void {
    this.errorSubject$.next(error);
  }
}

import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as authActions from "./store/auth.actions";

export enum CookiesItems {
  UserTokenKey = 'recipe-store-deluxe-token'
}

@Injectable()
export class AuthService {
  private tokenExpirationTimer: number;
  public isLoadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  public autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => { this.store.dispatch(new authActions.Logout()) }, expirationDuration);
  }

  public clearTokenExpirationTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}

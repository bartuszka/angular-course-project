import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { User } from "./user.model";
import { distinctUntilChanged, map } from "rxjs/operators";
import { AuthState } from "./store/auth.reducer";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from "./store/auth.actions";
import { AppErorr, ErrorService } from "../shared/alert/error.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  public isLoginMode: boolean = true;
  public isAuthLoading: boolean = false;
  public user$: Observable<User> = this.store.select('auth').pipe(
    map((authState: AuthState) => authState.user)
  );

  private loadingSubscription: Subscription;
  private errorSubscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private errorService: ErrorService
  ) { }

  public ngOnInit(): void {
    this.loadingSubscription = this.store.select('auth').pipe(
      map((authData: AuthState) => authData.loading),
      distinctUntilChanged()
    ).subscribe((isLoading: boolean) => {
      this.isAuthLoading = isLoading;
    });

    this.errorSubscription = this.store.select('auth').pipe(
      map((authData: AuthState) => authData.authError)
    ).subscribe((error: AppErorr) => {
      this.errorService.addError(error);
    });
  }

  public ngOnDestroy() {
    if (this.loadingSubscription) this.loadingSubscription.unsubscribe();
    if (this.errorSubscription) this.errorSubscription.unsubscribe();
  }

  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(form: NgForm): void {
    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart({ email: form.value.email, password: form.value.password }));
    } else {
      this.store.dispatch(new AuthActions.SignupStart({ email: form.value.email, password: form.value.password }));
    }
    form.reset();
  }
}

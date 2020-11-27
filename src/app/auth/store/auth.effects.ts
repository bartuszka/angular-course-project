import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as AuthActions from './auth.actions';
import { catchError, delay, map, switchMap, tap } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { User } from "../user.model";
import { Router } from "@angular/router";
import { AuthService, CookiesItems } from "../auth.service";

export interface AuthResponseData {
  localId: string,
  email: string,
  idToken: string,
  refreshToken: string,
  expiresIn: string,
  kind: string,
  registered?: boolean,
}

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
        { email: signupAction.payload.email,
          password: signupAction.payload.password,
          returnSecureToken: true }
      ).pipe(
        delay(3000),
        tap((authResponseData: AuthResponseData) => this.authService.autoLogout(+authResponseData.expiresIn * 1000)),
        map((authResponseData: AuthResponseData) => this.handleAuthentication(authResponseData)),
        catchError((error: HttpErrorResponse) => this.handleError(123, 'Błąd rejestrowania. Spróbuj ponownie.'))
      )
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
        { email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true }
      ).pipe(
        delay(3000),
        tap((authResponseData: AuthResponseData) => {
          this.authService.autoLogout(+authResponseData.expiresIn * 1000)
        }),
        map((authResponseData: AuthResponseData) => this.handleAuthentication(authResponseData)),
        catchError((error: HttpErrorResponse) => this.handleError(123, 'Błąd logowania. Spróbuj ponownie.'))
      );
    }),
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(() => this.router.navigate(['/']))
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem(CookiesItems.UserTokenKey);
      this.authService.clearTokenExpirationTimer();
      this.router.navigate(['/authentication']);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: string = localStorage.getItem(CookiesItems.UserTokenKey);

      if (!userData) {
        return { type: 'DUMMY' };
      }

      const { email, id, _token, _tokenExpirationDate } = JSON.parse(localStorage.getItem(CookiesItems.UserTokenKey))._initialData;
      const expirationDate: Date = new Date(_tokenExpirationDate);
      const loggedUser: User = new User({ email, id, _token, _tokenExpirationDate: expirationDate });

      if (!loggedUser.token) {
        return { type: 'DUMMY' };
      }

      const timeToExpiration: number = expirationDate.getTime() - new Date().getTime();
      this.authService.autoLogout(timeToExpiration);
      return new AuthActions.AuthenticateSuccess(loggedUser);
    })
  );

  private handleAuthentication(authResponseData: AuthResponseData): AuthActions.AuthenticateSuccess {
    const expirationDate: Date = new Date(new Date().getTime() + +authResponseData.expiresIn * 1000);
    const user = new User({ email: authResponseData.email,
                                      id: authResponseData.localId,
                                      _token: authResponseData.idToken,
                                      _tokenExpirationDate: expirationDate });
    localStorage.setItem(CookiesItems.UserTokenKey, JSON.stringify(user));
    return new AuthActions.AuthenticateSuccess(user);
  }

  private handleError(code: number, message: string): Observable<AuthActions.AuthenticateFail> {
    return of(new AuthActions.AuthenticateFail({ code, message }))
  }

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService) {}
}

import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { exhaustMap, map, take } from "rxjs/operators";
import { User } from "../auth/user.model";
import { RouterService } from "../shared/router-service";
import { Injectable } from "@angular/core";
import { ErrorService } from "../shared/alert/error.service";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import { AuthState } from "../auth/store/auth.reducer";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private routerService: RouterService,
    private errorService: ErrorService,
    private store: Store<fromApp.AppState>
    ) {}

  private handleUserRequest(user: User, req: HttpRequest<any>, next: HttpHandler) {
    const url: string = 'https://ng-recipe-book-deluxe.firebaseio.com/' + req.url;
    const requestWithUrl: HttpRequest<any> = req.clone({ url: url })

    if (user.token) {
      const modifiedRequest: HttpRequest<any> = requestWithUrl.clone({
        params: req.params.append('auth', user.token)
      });
      return next.handle(modifiedRequest)
    } else {
      this.errorService.addError({ code: 400, message: 'Twoja sesja wygasła. Zaloguj się ponownie' });
      // TO-DO LOGOUT
      this.routerService.navigate('/authentication');
      return next.handle(requestWithUrl);
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState: AuthState) => authState.user),
      exhaustMap((user: User) => user ? this.handleUserRequest(user, req, next) : next.handle(req)),
    );
  }
}

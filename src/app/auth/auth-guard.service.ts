import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { map, take } from "rxjs/operators";
import { RouterService } from "../shared/router-service";
import { User } from "./user.model";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import { AuthState } from "./store/auth.reducer";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private routerService: RouterService,
    private store: Store<fromApp.AppState>
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState: AuthState) => authState.user),
      map((user: User) => {
        if (!user || !user.token) {
          this.routerService.navigate('/authentication');
          return false;
        } else {
          return true;
        }
      })
    );
  }
}

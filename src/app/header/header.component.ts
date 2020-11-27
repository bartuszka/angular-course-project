import { Component } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Observable } from "rxjs";
import { User } from "../auth/user.model";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import { map } from "rxjs/operators";
import { AuthState } from "../auth/store/auth.reducer";
import * as AuthActions from "../auth/store/auth.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  public user$: Observable<User> = this.store.select('auth').pipe(
    map((authState: AuthState) => authState.user)
  );

  public onSaveData() {
    this.dataStorageService.storeRecipes().subscribe();
  }

  public onFetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  public logout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}

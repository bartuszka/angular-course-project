import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Recipe } from "../recipes/models/recipe.mode.";
import { RecipeService } from "../recipes/recipe.service";
import { catchError, exhaustMap, map, switchMap, take, tap } from "rxjs/operators";
import { EMPTY, Observable } from "rxjs";
import { ErrorService } from "./alert/error.service";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import { AuthState } from "../auth/store/auth.reducer";
import * as RecipeActions from "../recipes/store/recipe.actions";

@Injectable()
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private errorService: ErrorService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  public user$: Observable<User> = this.store.select('auth').pipe(
    map((authState: AuthState) => authState.user)
  );

  public storeRecipes(): Observable<Recipe[]> {
    const recipes: Recipe[] = this.recipeService.getRecipes();

    return this.user$.pipe(
      take(1),
      exhaustMap((user: User) => this.http.put<Recipe[]>('recipes.json', recipes)
      ),
      catchError((error: HttpErrorResponse) => {
        this.errorService.addError({
          code: error.status,
          message: 'Nie udało się zapisać przepisów.'
        })
        return EMPTY;
      })
    )
  }

  public fetchRecipes(): Observable<Recipe[]> {
    return this.user$.pipe(
      take(1),
      exhaustMap((user: User) => {
        return this.http.get<Recipe[]>('recipes.json')
      }),
      catchError((error: HttpErrorResponse) => {
        this.errorService.addError({
          code: error.status,
          message: 'Nie udało się pobrać przepisów.'
        })
        return EMPTY;
      }),
      map((recipes: Recipe[]) => {
        return recipes ? recipes.map((recipe: Recipe) => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
        }) : [];
      }),
      tap((recipes: Recipe[]) => {
        this.store.dispatch(new RecipeActions.SetRecipes(recipes));
        // this.recipeService.initializeRecipes(recipes);
      })
    );
  }
}

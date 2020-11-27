import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "../models/recipe.mode.";
import { DataStorageService } from "../../shared/data-storage.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";

@Injectable()
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(private dataStorageService: DataStorageService, private router: Router) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> {
    return this.dataStorageService.fetchRecipes();
  }
}

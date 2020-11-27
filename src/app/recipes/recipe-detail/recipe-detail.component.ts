import {Component, OnInit} from '@angular/core';
import { Recipe } from "../models/recipe.mode.";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute, Params } from "@angular/router";
import { RouterService } from "../../shared/router-service";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "../../shopping-list/store/shopping-list.actions"
import * as fromApp from "../../store/app.reducer";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  public recipe: Recipe;

  constructor(
    private routerService: RouterService,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipe = this.recipeService.getRecipeById(params['id'])
    });
  }

  public addToShoppingList(): void {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients))
  }

  public removeRecipe(): void {
    this.recipeService.removeRecipe(this.recipe);
    const firstRecipeID: string = this.recipeService.getRecipes()[0] ? this.recipeService.getRecipes()[0].id : null;
    this.routerService.navigate(firstRecipeID ? `../${firstRecipeID}` : '../', this.route);
  }
}

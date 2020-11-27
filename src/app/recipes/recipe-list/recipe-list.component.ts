import { Component, OnDestroy, OnInit } from '@angular/core';
import {Recipe} from "../models/recipe.mode.";
import { RecipeService } from "../recipe.service";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.reducer";
import { RecipeState } from "../store/recipe.reducer";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  public recipes: Recipe[];
  private recipesChangedSubscription: Subscription;

  constructor(private recipeService: RecipeService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.store.select('recipes').subscribe(
      (recipeState: RecipeState) => this.recipes = recipeState.recipes
    );
  }

  ngOnDestroy(): void {
    this.recipesChangedSubscription.unsubscribe();
  }
}

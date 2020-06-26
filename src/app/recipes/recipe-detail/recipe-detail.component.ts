import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../models/recipe.mode.";
import { RecipeService } from "../recipe.service";
import { ShoppingListService } from "../../shopping-list/shopping-list.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService, private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.recipeService.onRecipeSelected.subscribe((selectedRecipe: Recipe) => this.recipe = selectedRecipe);
  }

  public addToShoppingList(): void {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }
}

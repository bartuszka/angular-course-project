import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../models/recipe.mode.";
import { RecipeService } from "../recipe.service";
import { ShoppingListService } from "../../shopping-list/shopping-list.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.recipe = this.recipeService.getRecipeById(params['id']));
  }

  public addToShoppingList(): void {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  public removeRecipe(): void {
    this.recipeService.removeRecipe(this.recipe);
    const firstRecipeID: string = this.recipeService.getRecipes()[0] ? this.recipeService.getRecipes()[0].id : null;
    this.router.navigate(firstRecipeID ? ['../', firstRecipeID] : ['../'], { relativeTo: this.route });
  }
}

import { Recipe } from "./models/recipe.mode.";
import { EventEmitter, Output } from "@angular/core";
import { Ingredient } from "../shared/indredient.model";

export class RecipeService {
  @Output() public onRecipeSelected: EventEmitter<Recipe> = new EventEmitter();
  private recipes: Recipe[] = [
    new Recipe(
      'Shakshuka',
      'Easy, healthy breakfast (or any time of day) recipe in Israel and other parts of the Middle East and North Africa.',
      'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg',
      [new Ingredient('Jabłka', 3), new Ingredient('Pomidory', 5)]),
    new Recipe(
      'Grilled Turkish-Style Chicken Wings',
      'An improved setup for skewers brings these grilled wings closer to the heat, while a marinade based on Turkish hot pepper paste infuses them with roasted-chili flavor.',
      'https://www.seriouseats.com/2019/07/20190618-grilled-turkish-chicken-wings-vicky-wasik-13-1500x1125.jpg',
      [new Ingredient('Banany', 2), new Ingredient('Ryby', 1)]),
    new Recipe('Garlic Butter Sauteed Zucchini',
      'Sautéed zucchini is a quick, easy, and healthy side dish. It’s delicious, too.',
      'https://www.inspiredtaste.net/wp-content/uploads/2018/12/Sauteed-Zucchini-Recipe-1-1200.jpg',
      [new Ingredient('Mięso mielone', 1), new Ingredient('Ziemniaki', 3), new Ingredient('Kapusta', 2)])
  ];

  public getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  public emitSelectedRecipe(selectedRecipe: Recipe): void {
    this.onRecipeSelected.emit(selectedRecipe);
  }
}

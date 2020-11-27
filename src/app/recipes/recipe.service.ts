import { Recipe } from "./models/recipe.mode.";
import { Ingredient } from "../shared/indredient.model";
import { Subject } from "rxjs";

export class RecipeService {
  public recipesChanged$: Subject<Recipe[]> = new Subject();
  private recipes: Recipe[] = [
    /*new Recipe(
      '132644',
      'Shakshuka',
      'Easy, healthy breakfast (or any time of day) recipe in Israel and other parts of the Middle East and North Africa.',
      'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg',
      [new Ingredient('Jabłka', 3), new Ingredient('Pomidory', 5)]),
    new Recipe(
      '573584',
      'Grilled Turkish-Style Chicken Wings',
      'An improved setup for skewers brings these grilled wings closer to the heat, while a marinade based on Turkish hot pepper paste infuses them with roasted-chili flavor.',
      'https://www.seriouseats.com/2019/07/20190618-grilled-turkish-chicken-wings-vicky-wasik-13-1500x1125.jpg',
      [new Ingredient('Banany', 2), new Ingredient('Ryby', 1)]),
    new Recipe(
      '9547474',
      'Garlic Butter Sauteed Zucchini',
      'Sautéed zucchini is a quick, easy, and healthy side dish. It’s delicious, too.',
      'https://www.inspiredtaste.net/wp-content/uploads/2018/12/Sauteed-Zucchini-Recipe-1-1200.jpg',
      [new Ingredient('Mięso mielone', 1), new Ingredient('Ziemniaki', 3), new Ingredient('Kapusta', 2)])*/
  ];

  public initializeRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged$.next(this.recipes.slice());
  }

  public getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  public getRecipeById(id: string): Recipe {
    return this.recipes.find((recipe: Recipe) => recipe.id === id);
  }

  public removeRecipe(recipe: Recipe): void {
    const removedRecipeIndex: number = this.recipes.findIndex((currentRecipe: Recipe) => currentRecipe.id === recipe.id);
    this.recipes.splice(removedRecipeIndex, 1);
    this.recipesChanged$.next(this.recipes.slice());
  }

  public addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged$.next(this.recipes.slice());
  }

  public editRecipe(recipeId: string, recipe: Recipe): void {
    const existingRecipeIndex: number = this.recipes.findIndex((recipe: Recipe) => recipe.id === recipeId);
    if (existingRecipeIndex !== -1) {
      this.recipes[existingRecipeIndex] = recipe;
      this.recipesChanged$.next(this.recipes.slice());
    }
  }

  public doesContainId(recipeId: string): boolean {
    return this.recipes.map((recipe: Recipe) => recipe.id).indexOf(recipeId) !== -1;
  }
}

import { Ingredient } from "../shared/indredient.model";
import { EventEmitter, Output } from "@angular/core";

export class ShoppingListService {
  @Output() public updateIngredients: EventEmitter<Ingredient[]> = new EventEmitter();
  public ingredients: Ingredient[] = [
    new Ingredient('Jabłka', 5),
    new Ingredient('Pomidory', 10),
  ];

  public getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  public addIngredient(selectedIngredient: Ingredient): void {
    const existingIngredient: Ingredient = this.ingredients.find((ingredient: Ingredient) => ingredient.name === selectedIngredient.name);
    existingIngredient ? existingIngredient.amount += +selectedIngredient.amount : this.ingredients.push(selectedIngredient);
    this.updateIngredients.emit(this.ingredients.slice());
  }

  public addIngredients(ingredients: Ingredient[]): void {
    for (const ingredient of ingredients) {
      this.addIngredient(ingredient);
    }
  }
}

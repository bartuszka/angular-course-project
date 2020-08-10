import { Ingredient } from "../shared/indredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
  public selectedIngredientChanged: Subject<number> = new Subject();
  public updateIngredients: Subject<Ingredient[]> = new Subject();
  public ingredients: Ingredient[] = [
    new Ingredient('Jabłka', 5),
    new Ingredient('Pomidory', 10),
  ];

  public getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  public addIngredient(ingredient: Ingredient): void {
    ingredient.name = ingredient.name.trim();
    const existingIngredient: Ingredient = this.ingredients.find(
      (currentIngredient: Ingredient) => ingredient.name.toLowerCase() === currentIngredient.name.toLowerCase());
    existingIngredient ? existingIngredient.amount += +ingredient.amount : this.ingredients.push(ingredient);
    this.updateIngredients.next(this.ingredients.slice());
  }

  public addIngredients(ingredients: Ingredient[]): void {
    for (const ingredient of ingredients) {
      this.addIngredient(ingredient);
    }
  }

  public getIngredientByIndex(index: number): Ingredient {
    return this.ingredients[index];
  }

  public removeIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.updateIngredients.next(this.ingredients.slice());
  }

  public editIngredient(index: number, editedIngredient: Ingredient): void {
    editedIngredient.name = editedIngredient.name.trim();
    this.ingredients[index] = editedIngredient;
    this.organizeIngredients();
    this.updateIngredients.next(this.ingredients.slice());
  }

  public emitSelectedIngredient(index: number): void {
    this.selectedIngredientChanged.next(index);
  }

  private organizeIngredients(): void {
    const organizedIngredients: Ingredient[] = [];
    this.ingredients.forEach((ingredient: Ingredient) => {
      const existingIngredientIndex: number = organizedIngredients.findIndex(
        (existingIngredient: Ingredient) => existingIngredient.name.toLowerCase() === ingredient.name.toLowerCase());
      if (existingIngredientIndex !== -1) {
        organizedIngredients[existingIngredientIndex].amount += ingredient.amount;
      } else {
        organizedIngredients.push(ingredient);
      }
    });
    this.ingredients = organizedIngredients;
  }
}

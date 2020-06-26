import { Ingredient } from "../../shared/indredient.model";

export class Recipe {
  constructor(public name: string, public description: string, public image: string, public ingredients: Ingredient[]) {
  }
}

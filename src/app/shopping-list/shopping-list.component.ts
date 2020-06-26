import { Component, OnInit } from '@angular/core';
import {Ingredient} from "../shared/indredient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  public ingredients: Ingredient[] = [
    new Ingredient('Jabłka', 5),
    new Ingredient('Pomidory', 10),
  ]

  constructor() { }

  ngOnInit(): void {
  }

  public addIngredient(selectedIngredient: Ingredient) {
    const existingIngredient: Ingredient = this.ingredients.find((ingredient: Ingredient) => ingredient.name === selectedIngredient.name);
    existingIngredient ? existingIngredient.amount += +selectedIngredient.amount : this.ingredients.push(selectedIngredient);
  }
}

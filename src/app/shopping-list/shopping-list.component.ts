import { Component, OnDestroy, OnInit } from '@angular/core';
import {Ingredient} from "../shared/indredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredients: Ingredient[] = [];
  private ingredientsChangedubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsChangedubscription = this.shoppingListService.updateIngredients.subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);
  }

  ngOnDestroy(): void {
    this.ingredientsChangedubscription.unsubscribe();
  }

  public onItemSelected(itemIndex: number) {
    this.shoppingListService.emitSelectedIngredient(itemIndex);
  }
}

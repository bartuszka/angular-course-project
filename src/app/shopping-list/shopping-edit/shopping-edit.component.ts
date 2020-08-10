import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {Ingredient} from "../../shared/indredient.model";
import { ShoppingListService } from "../shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingListForm', { static: true }) shoppingListForm: NgForm;
  public ingredient: Ingredient;
  public ingredientIndex: number;
  private selectedIngredientChangedSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.selectedIngredientChangedSubscription = this.shoppingListService.selectedIngredientChanged.subscribe(
      (selectedIngredientIndex: number) => {
        this.ingredient = this.shoppingListService.getIngredientByIndex(selectedIngredientIndex);
        this.ingredientIndex = selectedIngredientIndex;
        this.shoppingListForm.setValue(this.ingredient);
      }
    );
    this.shoppingListForm.valueChanges.subscribe(() => this.isFormEmpty() && this.clearEditedData());
  }

  ngOnDestroy(): void {
    this.selectedIngredientChangedSubscription.unsubscribe();
  }

  public addEditIngredient(form: NgForm): void {
    this.ingredient ?
      this.shoppingListService.editIngredient(this.ingredientIndex, this.shoppingListForm.value) :
      this.shoppingListService.addIngredient(new Ingredient(form.value.name, form.value.amount));
    this.clearForm();
  }

  public removeIngredient() {
    if (this.ingredientIndex != null) {
      this.shoppingListService.removeIngredient(this.ingredientIndex);
    }
  }

  public clearForm(): void {
    this.clearEditedData();
    this.shoppingListForm.reset();
  }

  public hasFormChanged(): boolean {
    return this.ingredient ? JSON.stringify({...this.ingredient}) !== JSON.stringify({...this.shoppingListForm.value}) : !this.isFormEmpty();
  }

  private isFieldEmpty(field: string) {
    return !field || field === '';
  }

  public isFormEmpty(): boolean {
    return this.isFieldEmpty(this.shoppingListForm.value.name) && this.isFieldEmpty(this.shoppingListForm.value.amount);
  }

  private clearEditedData(): void {
    this.ingredient = null;
    this.ingredientIndex = null;
  }
}

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {Ingredient} from "../../shared/indredient.model";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { distinctUntilChanged, map, switchMap, tap } from "rxjs/operators";
import * as ShoppingListActions from '../store/shopping-list.actions';
import { ShoppingListState } from "../store/shopping-list.reducer";
import * as fromApp from "../../store/app.reducer";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingListForm', { static: true }) shoppingListForm: NgForm;
  public ingredient: Ingredient;
  private selectedIngredientChangedSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.selectedIngredientChangedSubscription = this.store.select('shoppingList').pipe(
      distinctUntilChanged((shoppingPrevListStateData: ShoppingListState, shoppingListStateData: ShoppingListState) =>
        shoppingPrevListStateData.editedIngredientIndex === shoppingListStateData.editedIngredientIndex)
    ).subscribe((shoppingListStateData: ShoppingListState) => {
      if (shoppingListStateData.editedIngredientIndex > -1) {
        this.ingredient = shoppingListStateData.editedIngredient;
        this.shoppingListForm.setValue(this.ingredient);
      } else {
        this.clearEditedData();
      }
    });

    this.shoppingListForm.valueChanges.subscribe(() => this.isFormEmpty() && this.clearEditedData());
  }

  ngOnDestroy(): void {
    this.selectedIngredientChangedSubscription.unsubscribe();
  }

  public addEditIngredient(form: NgForm): void {
    this.ingredient ?
      this.store.dispatch(new ShoppingListActions.EditIngredient(new Ingredient(form.value.name, form.value.amount))) :
      this.store.dispatch(new ShoppingListActions.AddIngredient(new Ingredient(form.value.name, form.value.amount)))
    this.clearForm();
  }

  public removeIngredient() {
    this.store.dispatch(new ShoppingListActions.RemoveIngredient());
  }

  public clearForm(): void {
    this.store.dispatch(new ShoppingListActions.StopEdit());
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
  }
}

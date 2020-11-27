import { Component, OnInit } from '@angular/core';
import { Ingredient } from "../shared/indredient.model";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from "../store/app.reducer";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  public ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList')
  }

  public onItemSelected(itemIndex: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(itemIndex));
  }
}

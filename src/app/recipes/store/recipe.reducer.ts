import { Recipe } from "../models/recipe.mode.";
import * as RecipeActions from "./recipe.actions";

export interface RecipeState {
  recipes: Recipe[];
}

export const initialState: RecipeState = {
  recipes: []
}

export function recipeReducer(state: RecipeState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      }
  }
  return state;
}

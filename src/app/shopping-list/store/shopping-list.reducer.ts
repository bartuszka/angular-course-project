import { Ingredient } from "../../shared/indredient.model";
import * as ShoppingListActions from './shopping-list.actions';

export interface ShoppingListState {
  editedIngredient: Ingredient,
  editedIngredientIndex: number,
  ingredients: Ingredient[]
}

const initialState: ShoppingListState = {
  editedIngredient: null,
  editedIngredientIndex: -1,
  ingredients: [
    new Ingredient('Jabłka', 5),
    new Ingredient('Pomidory', 10),
  ]
};

export function shoppingListReducer(state: ShoppingListState = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT: {
      const newIngredient: Ingredient = { ...action.payload };
      const newIngredients: Ingredient[] = [...state.ingredients];
      addIngredient(newIngredient, newIngredients);

      return {
        ...state,
        ingredients: newIngredients,
      };
    }
    case ShoppingListActions.ADD_INGREDIENTS: {
      const newIngredients: Ingredient[] = [...(action as ShoppingListActions.AddIngredients).payload];
      const ingredients: Ingredient[] = [...state.ingredients];
      addIngredients(newIngredients, ingredients);

      return {
        ...state,
        ingredients,
      };
    }
    case ShoppingListActions.EDIT_INGREDIENT: {
      const editedIngredient: Ingredient = new Ingredient(action.payload.name, action.payload.amount);
      const index: number = state.editedIngredientIndex;
      const ingredients: Ingredient[] = [...state.ingredients];
      editIngredient(editedIngredient, index, ingredients);

      return {
        ...state,
        ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    }
    case ShoppingListActions.REMOVE_INGREDIENT: {
      const ingredients: Ingredient[] = [...state.ingredients];
      const index: number = state.editedIngredientIndex;
      ingredients.splice(index, 1);

      return {
        ...state,
        ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    }
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] }
      }
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      }
    default:
      return state;
  }
}

function editIngredient(editedIngredient: Ingredient, index: number, ingredients: Ingredient[]) {
  editedIngredient.name = editedIngredient.name.trim();
  ingredients[index] = editedIngredient;
  organizeIngredients(ingredients);
}

function addIngredient(ingredient: Ingredient, ingredients: Ingredient[]): void {
  const existingIngredientIndex: number = ingredients.findIndex(
    (currentIngredient: Ingredient) => ingredient.name.toLowerCase() === currentIngredient.name.toLowerCase());
  let existingIngredient = ingredients[existingIngredientIndex];

  ingredient.name = ingredient.name.trim();
  existingIngredient = existingIngredient ? { ...existingIngredient } : null;

  if (existingIngredient) {
    existingIngredient.amount += ingredient.amount;
    ingredients[existingIngredientIndex] = existingIngredient;
  } else {
    ingredients.push(ingredient);
  }
}

function addIngredients(newIngredients: Ingredient[], ingredients: Ingredient[]): void {
  for (const ingredient of newIngredients) {
    addIngredient({ ...ingredient }, ingredients);
  }
}

function organizeIngredients(ingredients: Ingredient[]): void {
  const organizedIngredients: Ingredient[] = [];
  ingredients.forEach((ingredient: Ingredient) => {
    const existingIngredientIndex: number = organizedIngredients.findIndex(
      (existingIngredient: Ingredient) => {
        return existingIngredient.name.toLowerCase() === ingredient.name.toLowerCase()
      });

    if (existingIngredientIndex !== -1) {
      organizedIngredients[existingIngredientIndex].amount += ingredient.amount;
    } else {
      organizedIngredients.push(ingredient);
    }
  });
  ingredients = organizedIngredients;
}

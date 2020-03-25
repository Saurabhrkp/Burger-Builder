import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENTS_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  meat: 1.3,
  cheese: 0.4
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const updateIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
      };
      const updateIngredients = updateObject(
        state.ingredients,
        updateIngredient
      );
      const updatedState = {
        ingredients: updateIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
      };
      return updateObject(state, updatedState);
    case actionTypes.REMOVE_INGREDIENT:
      const updateIngredientRemove = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
      };
      const updateIngredientsRemove = updateObject(
        state.ingredients,
        updateIngredientRemove
      );
      const updatedStateRemove = {
        ingredients: updateIngredientsRemove,
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
      };
      return updateObject(state, updatedStateRemove);
    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false
      });
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });
    default:
      return state;
  }
};

export default reducer;

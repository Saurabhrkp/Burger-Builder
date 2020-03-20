import React, { useState } from 'react';

import Aux from '../../hoc/Auxiliary';
import Buger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  meat: 1.3,
  cheese: 0.4
};

const BurgerBuilder = () => {
  const [state, setState] = useState({
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  });

  const addIngredientHandler = type => {
    const oldCount = state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENTS_PRICES[type];
    const oldPrice = state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  };

  const removeIngredientHandler = type => {
    const oldCount = state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENTS_PRICES[type];
    const oldPrice = state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  };

  const disabledInfo = { ...state.ingredients };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  return (
    <Aux>
      <Buger ingredients={state.ingredients} />
      <BuildControls
        ingredientAdded={addIngredientHandler}
        ingredientRemoved={removeIngredientHandler}
        disabled={disabledInfo}
      />
    </Aux>
  );
};

export default BurgerBuilder;

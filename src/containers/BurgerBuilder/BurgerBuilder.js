import React, { useState } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Buger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';

const INGREDIENTS_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  meat: 1.3,
  cheese: 0.4
};

const BurgerBuilder = () => {
  const [ingredients, setIngredients] = useState({
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  });
  const [totalPrice, setTotalPrice] = useState(4);
  const [purchasable, setPurchasable] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [loading, setLoading] = useState(false);

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igkey => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    setPurchasable(sum > 0);
  };

  const addIngredientHandler = type => {
    const oldCount = ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...ingredients };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENTS_PRICES[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice + priceAddition;
    setTotalPrice(newPrice);
    setIngredients(updatedIngredients);
    updatePurchaseState(updatedIngredients);
  };

  const removeIngredientHandler = type => {
    const oldCount = ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENTS_PRICES[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice - priceDeduction;
    setTotalPrice(newPrice);
    setIngredients(updatedIngredients);
    updatePurchaseState(updatedIngredients);
  };

  const disabledInfo = { ...ingredients };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  const purchaseHandler = () => {
    setPurchasing(true);
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    setLoading(true);
    const order = {
      ingredients: ingredients,
      price: totalPrice,
      customer: {
        name: 'Saurabh Patel',
        address: {
          street: 'Test Street',
          pinCode: 421301,
          country: 'India'
        },
        email: 'test@mail.com'
      },
      deliveryMethod: 'fastest'
    };
    axios
      .post('/orders.json', order)
      .then(response => {
        setLoading(false);
        setPurchasing(false);
      })
      .catch(error => {
        setLoading(false);
        setPurchasing(false);
      });
  };

  let orderSummary = (
    <OrderSummary
      ingredients={ingredients}
      purchaseCanceled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler}
    />
  );
  if (loading) {
    orderSummary = <Spinner />;
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      <Buger ingredients={ingredients} />
      <BuildControls
        ingredientAdded={addIngredientHandler}
        ingredientRemoved={removeIngredientHandler}
        disabled={disabledInfo}
        price={totalPrice}
        ordered={purchaseHandler}
        purchasable={purchasable}
      />
    </Aux>
  );
};

export default withErrorHandler(BurgerBuilder, axios);

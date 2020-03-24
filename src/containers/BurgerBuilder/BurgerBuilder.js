import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Buger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import * as burgerBuilderActions from '../../store/actions/index';

const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
  }, []);

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igkey => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const disabledInfo = { ...props.ings };
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
    props.history.push('/checkout');
  };

  let orderSummary = null;

  let burger = props.error ? <p>Ingredient can't be loaded!</p> : <Spinner />;

  if (props.ings) {
    burger = (
      <Aux>
        <Buger ingredients={props.ings} />
        <BuildControls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemove}
          disabled={disabledInfo}
          price={props.price}
          ordered={purchaseHandler}
          purchasable={updatePurchaseState(props.ings)}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredients={props.ings}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
    error: state.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemove: ingName =>
      dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));

import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Buger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import * as actionTypes from '../../store/actions';

const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
    const queryParams = [];
    for (let i in props.ings) {
      queryParams.push(
        encodeURIComponent(i) + '=' + encodeURIComponent(props.ings[i])
      );
    }
    queryParams.push('price=' + props.price);
    const queryString = queryParams.join('&');
    props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  };

  let orderSummary = null;

  let burger = error ? <p>Ingredient can't be loaded!</p> : <Spinner />;

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

  // if (loading) {
  //   orderSummary = <Spinner />;
  // }

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
    price: state.totalPrice
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemove: ingName =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));

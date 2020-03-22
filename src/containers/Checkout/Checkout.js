import React, { useState } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

const Checkout = () => {
  const [ingredients, useIngredients] = useState({
    salad: 1,
    meat: 1,
    bacon: 1,
    cheese: 1
  });
  return (
    <div>
      <CheckoutSummary ingredients={ingredients} />
    </div>
  );
};

export default Checkout;
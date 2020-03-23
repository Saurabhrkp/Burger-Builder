import React from 'react';

import styles from './Order.module.css';

const Order = props => {
  return (
    <div className={styles.Order}>
      <p>Ingredients: Salad (1)</p>
      <p>
        Price: <strong>INR 5.45</strong>
      </p>
    </div>
  );
};

export default Order;

import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.module.css';

const checkoutSummary = props => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope it taste well!</h1>
      <div styles={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType='Danger'>CANCEL</Button>
      <Button btnType='Success'>CONTINUE</Button>
    </div>
  );
};

export default checkoutSummary;

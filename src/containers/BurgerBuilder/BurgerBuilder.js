import React from 'react';

import Aux from '../../hoc/Auxiliary';
import Buger from '../../components/Burger/Burger';

const BurgerBuilder = () => {
  return (
    <Aux>
      <Buger />
      <div>Build Controls</div>
    </Aux>
  );
};

export default BurgerBuilder;

import React from 'react';

import Aux from '../../hoc/Auxiliary';

const layout = props => {
  return (
    <Aux>
      <div>Toolbar, SiderDrawer, Backdrop</div>
      <main>{props.children}</main>
    </Aux>
  );
};
export default layout;

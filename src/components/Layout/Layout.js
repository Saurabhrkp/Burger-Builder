import React, { useState } from 'react';

import Aux from '../../hoc/Auxiliary';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = props => {
  var [showSideDrawer, setShowSideDrawer] = useState(true);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  return (
    <Aux>
      <Toolbar />
      <SideDrawer closed={sideDrawerClosedHandler} open={showSideDrawer} />
      <main className={styles.Content}>{props.children}</main>
    </Aux>
  );
};

export default Layout;

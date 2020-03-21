import React, { useState } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <Aux>
      <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer closed={sideDrawerClosedHandler} open={showSideDrawer} />
      <main className={styles.Content}>{props.children}</main>
    </Aux>
  );
};

export default Layout;

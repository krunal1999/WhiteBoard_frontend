import React from 'react';
import styles from './menu.module.css';
import IconButton from './IconButton';
import rectangleIcon from '../../assets/images/icons/rectangle.svg';
import { toolTypes } from '../../constants';

const Menu = () => {
  return (
    <div className={styles.container}>
      <IconButton src={rectangleIcon} type={toolTypes.RECTANGLE} />
    </div>
  );
};

export default Menu;

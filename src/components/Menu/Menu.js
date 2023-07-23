import React from 'react';
import styles from './menu.module.css';
import IconButton from './IconButton';
import rectangleIcon from '../../assets/images/icons/rectangle.svg';
import lineIcon from '../../assets/images/icons/line.svg';
import { toolTypes } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setTootType } from '../../redux/slices/whiteboardSlice';

const Menu = () => {
  const dispatch = useDispatch();
  const tool = useSelector(state => state.whiteboard.tool);

  const handleToolChange = type => {
    dispatch(setTootType(type));
  };

  return (
    <div className={styles.container}>
      <IconButton
        src={rectangleIcon}
        type={toolTypes.RECTANGLE}
        active={tool === toolTypes.RECTANGLE}
        handleToolChange={handleToolChange}
      />
      <IconButton
        src={lineIcon}
        type={toolTypes.LINE}
        active={tool === toolTypes.LINE}
        handleToolChange={handleToolChange}
      />
    </div>
  );
};

export default Menu;

import React from 'react';
import styles from './menu.module.css';
import IconButton from './IconButton';
import rectangleIcon from '../../assets/images/icons/rectangle.svg';
import lineIcon from '../../assets/images/icons/line.svg';
import rubberIcon from '../../assets/images/icons/rubber.svg';
import { toolTypes } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setElements, setTootType } from '../../redux/slices/whiteboardSlice';
import { emitClearWhiteBoard } from '../../socketConnection/socketConnection';

const Menu = () => {
  const dispatch = useDispatch();
  const tool = useSelector(state => state.whiteboard.tool);

  const handleToolChange = type => {
    dispatch(setTootType(type));
  };
  const handleClearCanvas = type => {
    dispatch(setTootType(type));
    dispatch(setElements([]));
    emitClearWhiteBoard();
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
      <IconButton
        src={rubberIcon}
        type={toolTypes.RUBBER}
        active={tool === toolTypes.RUBBER}
        handleToolChange={handleClearCanvas}
      />
    </div>
  );
};

export default Menu;

import React from 'react';
import styles from './menu.module.css';
import IconButton from './IconButton';
import rectangleIcon from '../../assets/images/icons/rectangle.svg';
import lineIcon from '../../assets/images/icons/line.svg';
import rubberIcon from '../../assets/images/icons/rubber.svg';
import pencilIcon from '../../assets/images/icons/pencil.svg';
import textIcon from '../../assets/images/icons/text.svg';
import selectionIcon from '../../assets/images/icons/selection.svg';
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
    dispatch(setTootType(null));
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
      <IconButton
        src={pencilIcon}
        type={toolTypes.PENCIL}
        active={tool === toolTypes.PENCIL}
        handleToolChange={handleToolChange}
      />
      <IconButton
        src={textIcon}
        type={toolTypes.TEXT}
        active={tool === toolTypes.TEXT}
        handleToolChange={handleToolChange}
      />
      <IconButton
        src={selectionIcon}
        type={toolTypes.SELECTION}
        active={tool === toolTypes.SELECTION}
        handleToolChange={handleToolChange}
      />
    </div>
  );
};

export default Menu;

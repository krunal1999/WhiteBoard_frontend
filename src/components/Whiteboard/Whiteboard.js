import React, { useRef, useLayoutEffect, useState } from 'react';
import Menu from '../Menu/Menu';
import rough from 'roughjs/bundled/rough.esm';
import { useDispatch, useSelector } from 'react-redux';
import { actions, toolTypes } from '../../constants';
import { createElement, updateElement } from '../../utils';
import { updateElementInStore } from '../../redux/slices/whiteboardSlice';


let selectedElement;

const setSelectedElement = el => {
  selectedElement = el;
};

const Whiteboard = () => {
  const [action, setAction] = useState(null);
  const canvasRef = useRef();
  const toolType = useSelector(state => state.whiteboard.tool);
  const dispatch = useDispatch();

  const elements = useSelector(state => state.whiteboard.elements);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const rc = rough.canvas(canvas);
    rc.line(80, 700, 300, 0);
  }, []);

  const handleMouseDown = event => {
    // get x, y coordinates where mouse pressed
    const { clientX, clientY } = event;

    if (toolType === toolTypes.RECTANGLE) {
      setAction(actions.DRAWING);
      const element = createElement({
        x1: clientX,
        y1: clientY,
        x2: clientX,
        y2: clientY,
        toolType,
        id: crypto.randomUUID(),
      });

      setSelectedElement(element);
      dispatch(updateElementInStore(element));
    }
  };

  const handleMouseUp = () => {
    setAction(null);
    setSelectedElement(null);
  };

  const handleMouseMove = event => {
    const { clientX, clientY } = event;

    if (action === actions.DRAWING) {
      // find index of selected element
      const index = elements.findIndex(el => el.id === selectedElement.id);

      if (index !== -1) {
        updateElement({
          index,
          id: elements[index].id,
          x1: elements[index].x1,
          y1: elements[index].y1,
          x2: clientX,
          y2: clientY,
          type: elements[index].type,
        },elements, );
      }
    }
  };

  return (
    <>
      <Menu />
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </>
  );
};

export default Whiteboard;

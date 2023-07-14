import React, { useRef, useLayoutEffect, useState } from 'react';
import Menu from '../Menu/Menu';
import rough from 'roughjs/bundled/rough.esm';
import { useSelector } from 'react-redux';
import { actions, toolTypes } from '../../constants';
import { createElement } from '../../utils';

const Whiteboard = () => {
  const canvasRef = useRef();
  const toolType = useSelector(state => state.whiteboard.tool);
  const [action, setAction] = useState(null);

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
    }
  };

  return (
    <>
      <Menu />
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </>
  );
};

export default Whiteboard;

import { toolTypes } from '../constants';
import { createElement } from './createElement';
import { store } from '../redux/store/store';
import { setElements } from '../redux/slices/whiteboardSlice';
import { emitElementUpdate } from '../socketConnection/socketConnection';

 export function updatePencilElementMoving({ index, newPoints }, elements) {
  const elementsCopy = [...elements];

  elementsCopy[index] = {
    ...elements[index],
    points: newPoints,
  };

  const updatedPencilElement = elementsCopy[index];
  store.dispatch(setElements(elementsCopy));
  emitElementUpdate(updatedPencilElement);
}

export const updateElement = (
  { id, x1, x2, y1, y2, type, index, text },
  elements,
) => {
  const elementsCopy = [...elements];

  switch (type) {
    case toolTypes.LINE:
    case toolTypes.RECTANGLE: {
      const updatedElement = createElement({
        id,
        x1,
        x2,
        y1,
        y2,
        toolType: type,
      });

      elementsCopy[index] = updatedElement;
      store.dispatch(setElements(elementsCopy));

      emitElementUpdate(updatedElement);
      break;
    }
    case toolTypes.PENCIL: {
      elementsCopy[index] = {
        ...elementsCopy[index],
        points: [...elementsCopy[index].points, { x: x2, y: y2 }],
      };
      const updatedElement = elementsCopy[index];

      store.dispatch(setElements(elementsCopy));

      emitElementUpdate(updatedElement);
      break;
    }
    case toolTypes.TEXT: {
      const textWidth = document
        .getElementById('canvas')
        .getContext('2d')
        .measureText(text).width;

      const textHeight = 24;

      elementsCopy[index] = {
        ...createElement({
          id,
          x1,
          y1,
          x2: x1 + textWidth,
          y2: y1 + textHeight,
          toolType: type,
          text,
        }),
      };

      const updatedTextElement = elementsCopy[index];
      store.dispatch(setElements(elementsCopy));
      emitElementUpdate(updatedTextElement);
      break;
    }
    default: {
      throw new Error('Something went wrong when updating elements');
    }
  }
};

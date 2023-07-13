import { configureStore } from '@reduxjs/toolkit';
import whiteboardReducer from '../slices/whiteboardSlice';

export const store = configureStore({
  reducer: {
    whiteboard:whiteboardReducer
  },
});

import { configureStore } from '@reduxjs/toolkit';
import whiteboardReducer from '../slices/whiteboardSlice';

export const store = configureStore({
  reducer: {
    whiteboard: whiteboardReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ['whiteboard/setElements'],
        ignorePaths: ['whiteboard.elements'],
      },
    }),
});

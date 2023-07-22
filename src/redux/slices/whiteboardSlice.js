import { createSlice } from '@reduxjs/toolkit';

const initialState = { tool: null, elements: [] };

const whiteboardSlice = createSlice({
  name: 'whiteboard',
  initialState,
  reducers: {
    setTootType: (state, action) => {
      state.tool = action.payload;
    },
    updateElementInStore: (state, action) => {
      const { id } = action.payload;

      const index = state.elements.findIndex(el => el.id === id);
      if (index === -1) {
        state.elements.push(action.payload);
      } else {
        // If index is found, update array of
      }
    },
    setElements: (state, action) => {
      state.elements = action.payload;
    },
  },
});

export const { setTootType, updateElementInStore, setElements } =
  whiteboardSlice.actions;

export default whiteboardSlice.reducer;

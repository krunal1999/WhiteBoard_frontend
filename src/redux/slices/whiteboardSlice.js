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
      console.log(action.payload)

      const index = state.elements.findIndex(el => el.id === id);
      if (index === -1) {
        state.elements.push(action.payload);
      } else {
        state.elements[index] = action.payload;
      }

      
    },
    setElements: (state, action) => {
      state.elements = action.payload;
    },
    clearWhiteboard: (state) => {
      // state.elements = [];
      return initialState; 
    },
    
  },
});

export const { setTootType, updateElementInStore, setElements, clearWhiteboard } =
  whiteboardSlice.actions;


export default whiteboardSlice.reducer;

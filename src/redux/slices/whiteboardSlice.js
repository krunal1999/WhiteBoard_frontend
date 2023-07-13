import { createSlice } from '@reduxjs/toolkit';

const initialState = { tool: null };

const whiteboardSlice = createSlice({
  name: 'whiteboard',
  initialState,
  reducers: {
    setTootType: (state, action) => {
      state.tool = action.payload;
    },
  },
});

export const { setTootType } = whiteboardSlice.actions;

export default whiteboardSlice.reducer;

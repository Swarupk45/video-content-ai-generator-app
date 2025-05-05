import { createSlice } from '@reduxjs/toolkit';

const IdeaSlice = createSlice({
  name: 'idea',
  initialState: {
    contentIdeas: [],
  },
  reducers: {
    addContentIdea: (state, action) => {
      state.contentIdeas.push(action.payload);
    },
  },
});

export const { addContentIdea } = IdeaSlice.actions;
export default IdeaSlice.reducer;

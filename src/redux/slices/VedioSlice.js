import { createSlice } from '@reduxjs/toolkit';

const videoSlice = createSlice({
  name: 'video',
  initialState: {
    uploadedVideos: [],
  },
  reducers: {
    addUploadedVideo: (state, action) => {
      state.uploadedVideos.push(action.payload);
    },
      setCurrentVideo: (state, action) => {
        state.currentVideo = action.payload;
      },
  },
});

export const { addUploadedVideo,setCurrentVideo } = videoSlice.actions;
export default videoSlice.reducer;

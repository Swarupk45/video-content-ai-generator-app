import { configureStore } from '@reduxjs/toolkit';
import videoReducer from "./slices/VedioSlice";
import ideaReducer from './slices/IdeaSlice'
import authReducer from "./slices/authSlice"
import sidebarReducer from "./slices/sidebarSlice"
export const store = configureStore({
  reducer: {
    video: videoReducer,
    idea: ideaReducer,
    auth: authReducer,
    sidebar: sidebarReducer,
  },
});


import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { toastSlice } from './toast';
import userSlice from './users/usersSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    toast: toastSlice.reducer,
    users: userSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
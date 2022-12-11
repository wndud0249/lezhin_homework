import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './filter/reducers';

const rootReducer = combineReducers({
  filter: filterSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export default rootReducer;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

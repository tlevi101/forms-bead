import { configureStore } from '@reduxjs/toolkit'
import {authReducer} from "./slices/UserSlice";
// ...

const store = configureStore({
  reducer: authReducer
});
store.subscribe(()=> console.log(store.getState()));
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store;
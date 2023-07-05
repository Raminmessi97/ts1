import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import {authApi} from "../api/authApi";

const rootReducer = combineReducers({
    auth: authReducer,
    // [authApi.reducerPath]:authApi.reducer
    [authApi.reducerPath]: authApi.reducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;